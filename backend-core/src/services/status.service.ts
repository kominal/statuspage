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
					status: Status.ONLINE,
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

		return this.CONFIG.groups
			.filter((group) => group.public)
			.map((group) => {
				return {
					name: group.name,
					slug: group.slug,
					description: group.description,
					status: Status.ONLINE,
					latencies: [0, 0, 0],
				};
			});
	}

	public async readHistory(groupSlug: string, projectSlug: string, checkSlug: string): Promise<StatusRecord[]> {
		return this.statusRecordModel.find({ groupSlug, projectSlug, checkSlug, time: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24) } });
	}
}
