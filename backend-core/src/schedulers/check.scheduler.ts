import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { v4 } from 'uuid';
import { StatusRecord, StatusRecordModel } from '../entities/status-record.entity';
import { Config, ConfigCheck, ConfigGroup, ConfigProject } from '../models/config.model';

@Injectable()
export class CheckScheduler {
	public CONFIG = JSON.parse(process.env.CONFIG) as Config;

	private readonly logger = new Logger(CheckScheduler.name);

	public constructor(@InjectModel(StatusRecord.name) public statusRecordModel: StatusRecordModel) {}

	private async check(group: ConfigGroup, project: ConfigProject, check: ConfigCheck): Promise<void> {
		const startTime = new Date().getTime();
		const response = await axios.get(check.url);
		const latency = new Date().getTime() - startTime;

		this.logger.log(`Check ${group.slug}/${project.slug}/${check.slug} returned status code ${response.status} in ${latency}ms.`);

		await this.statusRecordModel.create({
			groupSlug: group.slug,
			projectSlug: project.slug,
			checkSlug: check.slug,
			time: new Date(),
			statusCode: response.status,
			latency,
			createdAt: new Date(),
			createdBy: 'System',
			changedAt: new Date(),
			changedBy: 'System',
			uuid: v4(),
			data: check.type === 'HEALTH' ? response.data : undefined,
		});
	}

	@Cron(CronExpression.EVERY_MINUTE)
	public async run(): Promise<void> {
		for (const group of this.CONFIG.groups) {
			for (const project of group.projects) {
				for (const check of project.checks) {
					await this.check(group, project, check);
				}
			}
		}
	}
}
