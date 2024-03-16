import { MailerModule } from '@nestjs-modules/mailer';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { StatusRecordController } from './controllers/status-record.controller';
import { StatusRecord, StatusRecordSchema } from './entities/status-record.entity';
import { StatusRecordService } from './entity-services/status-record.service';
import { CustomLogger } from './helpers/logger';
import { RequestLoggingMiddleware } from './middlewares/request-logging.middleware';
import { CheckScheduler } from './schedulers/check.scheduler';

export const moduleDefinition = {
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING || 'mongodb://127.0.0.1/local'),
		MongooseModule.forFeature([{ name: StatusRecord.name, schema: StatusRecordSchema }]),
		MailerModule.forRoot({
			transport: process.env.MAIL_CONNECTION_STRING || 'smtps://user@example.com:topsecret@smtp.example.com',
		}),
		ScheduleModule.forRoot(),
	],
	controllers: [StatusRecordController],
	providers: [StatusRecordService, CustomLogger, CheckScheduler],
};

@Module(moduleDefinition)
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(RequestLoggingMiddleware).forRoutes('*');
	}
}
