import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { v4 } from 'uuid';
import { StatusRecord, StatusRecordModel, StatusType } from '../entities/status-record.entity';

@Injectable()
export class CheckScheduler {
	private readonly logger = new Logger(CheckScheduler.name);

	public constructor(@InjectModel(StatusRecord.name) public statusRecordModel: StatusRecordModel) {}

	@Cron(CronExpression.EVERY_MINUTE)
	public async run(): Promise<void> {
		const startTime = new Date().getTime();
		const r = await axios.get('https://www.google.com');
		const latency = new Date().getTime() - startTime;

		await this.statusRecordModel.create({
			time: new Date(),
			url: 'https://www.google.com',
			statusCode: r.status,
			latency,
			createdAt: new Date(),
			createdBy: 'System',
			changedAt: new Date(),
			changedBy: 'System',
			type: StatusType.LATENCY,
			uuid: v4(),
		});
	}
}
