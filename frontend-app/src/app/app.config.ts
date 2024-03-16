import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { Configuration, StatusApi } from 'backend-core-client';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(),
		provideAnimations(),
		{
			provide: Configuration,
			useFactory: (): Configuration =>
				new Configuration({
					basePath: `${
						window.location.origin === 'http://localhost:4200' ? 'https://status.kominal.cloud' : window.location.origin
					}/api/core`,
					middleware: [
						{
							post(response: any): any {
								const dateStringRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:.\d+)?(?:Z|(\+|-)([\d|:]*))?$/;
								if (response.responseType === 'json') {
									response.response = JSON.parse(JSON.stringify(response.response), (key, value) => {
										if (typeof value === 'string' && dateStringRegex.test(value)) {
											return new Date(value);
										}

										return value;
									});
								}
								return response;
							},
						},
					],
				}),
		},
		[StatusApi].map((Api) => ({
			provide: Api,
			deps: [Configuration],
			useFactory: (configuration: Configuration): unknown => new Api(configuration),
		})),
	],
};
