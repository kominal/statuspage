import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatusRecord, StatusRecordModel } from '../entities/status-record.entity';
import { Config } from '../models/config.model';
import { Check, Group, Project, Status } from '../models/result.model';

@Injectable()
export class StatusService {
	public CONFIG = JSON.parse(process.env.CONFIG) as Config;

	public constructor(@InjectModel(StatusRecord.name) public statusRecordModel: StatusRecordModel) {}

	public async readGroups(): Promise<Group[]> {
		return this.CONFIG.groups
			.filter((group) => group.public)
			.map((group) => {
				return {
					name: group.name,
					slug: group.slug,
					description: group.description,
					status: Status.ONLINE,
				};
			});
	}

	public async readProjects(groupSlug: string): Promise<Project[]> {
		const group = this.CONFIG.groups.find((group) => group.slug === groupSlug);

		if (!group) {
			return [];
		}

		return group.projects
			.filter((project) => project.public)
			.map((project) => {
				return {
					name: project.name,
					slug: project.slug,
					description: project.description,
					status: Status.DEGRADED,
				};
			});
	}

	public async readChecks(groupSlug: string, projectSlug: string): Promise<Check[]> {
		const group = this.CONFIG.groups.find((group) => group.slug === groupSlug);

		if (!group) {
			return [];
		}

		const project = group.projects.find((project) => project.slug === projectSlug);

		if (!project) {
			return [];
		}

		const checks = project.checks.filter((check) => check.public);

		const resultingChecks: Check[] = [];

		for (const check of checks) {
			const statusRecords = await this.statusRecordModel.find({
				groupSlug: group.slug,
				projectSlug: project.slug,
				checkSlug: check.slug,
				time: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 3) },
			});

			const latestStatusRecord = statusRecords[statusRecords.length - 1];

			resultingChecks.push({
				name: check.name,
				slug: check.slug,
				description: check.description,
				status: latestStatusRecord && latestStatusRecord.statusCode === 200 ? Status.ONLINE : Status.DEGRADED,
				latencies: statusRecords.map((statusRecord) => statusRecord.latency),
				data: latestStatusRecord?.data,
			});
		}

		return resultingChecks;
	}
}
