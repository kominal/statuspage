import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { writeFileSync } from 'fs';
import { exit } from 'process';
import { AppModule } from './app.module';
import { ErrorFilter } from './helpers/exception-filter';
import { CustomLogger } from './helpers/logger';
import { SwaggerAppModule } from './swagger-app.module';

process.on('uncaughtException', (exception) => {
	console.log(exception);
});

export async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(process.env.GENERATE_SWAGGER ? SwaggerAppModule : AppModule, {
		logger: new CustomLogger(),
		cors: { origin: '*' },
	});
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new ErrorFilter());
	app.enableCors();
	app.use(json({ limit: '8mb' }));

	const config = new DocumentBuilder()
		.setTitle('Core')
		.addServer('/api/core', 'Current installation')
		.addBearerAuth() //
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app as any, document);

	if (process.env.GENERATE_SWAGGER) {
		writeFileSync('swagger.json', JSON.stringify(document));
		exit(0);
	} else {
		await app.listen(3000);
	}
}
bootstrap();
