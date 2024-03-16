import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatusRecord } from '../entities/status-record.entity';
import { StatusRecordService } from '../entity-services/status-record.service';

@ApiTags('status-record')
@Controller('projects/:projectId/status/:statusId')
export class StatusRecordController {
	public constructor(private statusRecordService: StatusRecordService) {}

	@Get()
	public readHistory(@Param('projectId') projectId: string, @Param('statusId') statusId: string): Promise<StatusRecord[]> {
		return this.statusRecordService.readHistory(projectId, statusId);
	}
}
