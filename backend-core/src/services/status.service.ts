import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CONFIG } from '../app.module';
import { StatusRecord, StatusRecordModel } from '../entities/status-record.entity';
import { Check, Group, Project, Status } from '../models/result.model';

@Injectable()
export class StatusService {
	public constructor(@InjectModel(StatusRecord.name) public statusRecordModel: StatusRecordModel) {}

	public async readGroups(): Promise<Group[]> {
		return CONFIG.groups
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
		const group = CONFIG.groups.find((group) => group.slug === groupSlug);

		if (!group) {
			return [];
		}

		return Promise.all(
			group.projects
				.filter((project) => project.public)
				.map(async (project) => {
					const hasDegradedCheck = project.checks.some(async (check) => {
						if (check.public) {
							const latestStatusRecord = await this.statusRecordModel
								.find({
									groupSlug: group.slug,
									projectSlug: project.slug,
									checkSlug: check.slug,
								})
								.sort({ time: -1 })
								.limit(1);
							return latestStatusRecord.length === 0 || latestStatusRecord[0].statusCode !== 200;
						}

						return false;
					});

					return {
						name: project.name,
						slug: project.slug,
						description: project.description,
						status: hasDegradedCheck ? Status.DEGRADED : Status.ONLINE,
					};
				})
		);
	}

	public async readChecks(groupSlug: string, projectSlug: string): Promise<Check[]> {
		const group = CONFIG.groups.find((group) => group.slug === groupSlug);

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
