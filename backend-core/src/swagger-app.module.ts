import { Module } from '@nestjs/common';
import { moduleDefinition } from './app.module';

@Module({
	imports: [],
	controllers: moduleDefinition.controllers,
	providers: moduleDefinition.providers.map((provide) => ({ provide, useValue: undefined })),
})
export class SwaggerAppModule {}
