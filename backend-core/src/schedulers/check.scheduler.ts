import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { v4 } from 'uuid';
import { CONFIG } from '../app.module';
import { StatusRecord, StatusRecordModel } from '../entities/status-record.entity';
import { Change } from '../models/change.model';
import { ConfigCheck, ConfigGroup, ConfigProject } from '../models/config.model';
import { MailService } from '../services/mail.service';

@Injectable()
export class CheckScheduler {
	private readonly logger = new Logger(CheckScheduler.name);

	public constructor(
		@InjectModel(StatusRecord.name) private statusRecordModel: StatusRecordModel,
		private mailService: MailService
	) {}

	private async check(group: ConfigGroup, project: ConfigProject, check: ConfigCheck): Promise<Change | undefined> {
		let statusCode = 0;
		let latency = 0;
		let data = undefined;

		try {
			const startTime = new Date().getTime();
			const response = await axios.get(check.url);
			latency = new Date().getTime() - startTime;
			statusCode = response.status;
			data = response.data;

			this.logger.log(`Check ${group.slug}/${project.slug}/${check.slug} returned status code ${response.status} in ${latency}ms.`);
		} catch (e) {
			this.logger.log(`Check ${group.slug}/${project.slug}/${check.slug} failed.`);
		}

		const latestStatusRecord = await this.statusRecordModel
			.findOne({ groupSlug: group.slug, projectSlug: project.slug, checkSlug: check.slug })
			.sort({ time: -1 });

		const statusRecord: Omit<StatusRecord, '_id'> = {
			groupSlug: group.slug,
			projectSlug: project.slug,
			checkSlug: check.slug,
			time: new Date(),
			statusCode,
			latency,
			createdAt: new Date(),
			createdBy: 'System',
			changedAt: new Date(),
			changedBy: 'System',
			uuid: v4(),
			data: check.type === 'HEALTH' ? data : undefined,
		};

		await this.statusRecordModel.create(statusRecord);

		if (latestStatusRecord && latestStatusRecord.statusCode !== statusCode) {
			this.logger.log(
				`Status change detected for ${group.slug}/${project.slug}/${check.slug}: ${latestStatusRecord.statusCode} -> ${statusCode}`
			);

			return { group, project, check, previous: latestStatusRecord, current: statusRecord };
		}

		return undefined;
	}

	@Cron(CronExpression.EVERY_MINUTE)
	public async run(): Promise<void> {
		const changes: Change[] = [];
		for (const group of CONFIG.groups) {
			for (const project of group.projects) {
				for (const check of project.checks) {
					await this.check(group, project, check);
				}
			}
		}

		if (changes.length > 0) {
			await this.mailService.sendStatusChangeMail(changes[0].group.recipients || [], changes);
		}
	}
}
