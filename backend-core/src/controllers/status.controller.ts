import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Check, Group, Project } from '../models/result.model';
import { StatusService } from '../services/status.service';

@ApiTags('status')
@Controller('status')
export class StatusController {
	public constructor(private statusService: StatusService) {}

	@Get('groups')
	public readGroups(): Promise<Group[]> {
		return this.statusService.readGroups();
	}

	@Get('groups/:groupSlug/projects')
	public readProjects(@Param('groupSlug') groupSlug: string): Promise<Project[]> {
		return this.statusService.readProjects(groupSlug);
	}

	@Get('groups/:groupSlug/projects/:projectSlug/checks')
	public readChecks(@Param('groupSlug') groupSlug: string, @Param('projectSlug') projectSlug: string): Promise<Check[]> {
		return this.statusService.readChecks(groupSlug, projectSlug);
	}
}
