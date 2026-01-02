import { MailerModule } from '@nestjs-modules/mailer';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { readFileSync } from 'fs';
import { env } from 'process';
import { StatusController } from './controllers/status.controller';
import { CheckState, CheckStateSchema } from './entities/check-state.entity';
import { StatusRecord, StatusRecordSchema } from './entities/status-record.entity';
import { CustomLogger } from './helpers/logger';
import { RequestLoggingMiddleware } from './middlewares/request-logging.middleware';
import { Config } from './models/config.model';
import { CheckScheduler } from './schedulers/check.scheduler';
import { MailService } from './services/mail.service';
import { StatusService } from './services/status.service';

export const CONFIG = JSON.parse(env.CONFIGURATION || readFileSync('/data/configuration.json').toString('utf-8')) as Config;

export const moduleDefinition = {
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING || 'mongodb://127.0.0.1/local'),
		MongooseModule.forFeature([
			{ name: StatusRecord.name, schema: StatusRecordSchema },
			{ name: CheckState.name, schema: CheckStateSchema },
		]),
		MailerModule.forRoot({
			transport: process.env.MAIL_CONNECTION_STRING || 'smtps://user@example.com:topsecret@smtp.example.com',
		}),
		ScheduleModule.forRoot(),
	],
	controllers: [StatusController],
	providers: [StatusService, MailService, CustomLogger, CheckScheduler],
};

@Module(moduleDefinition)
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(RequestLoggingMiddleware).forRoutes('*');
	}
}
