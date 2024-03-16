import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatusRecord } from '../entities/status-record.entity';
import { StatusRecordService } from '../entity-services/status-record.service';

@ApiTags('status-record')
@Controller('groups/:groupSlug/projects/:projectSlug/checks/:checkSlug')
export class StatusRecordController {
	public constructor(private statusRecordService: StatusRecordService) {}

	@Get()
	public readHistory(
		@Param('groupSlug') groupSlug: string,
		@Param('projectSlug') projectSlug: string,
		@Param('checkSlug') checkSlug: string
	): Promise<StatusRecord[]> {
		return this.statusRecordService.readHistory(groupSlug, projectSlug, checkSlug);
	}
}
