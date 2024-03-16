import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatusRecord, StatusRecordModel } from '../entities/status-record.entity';

@Injectable()
export class StatusRecordService {
	public constructor(@InjectModel(StatusRecord.name) public statusRecordModel: StatusRecordModel) {}

	public async readHistory(groupSlug: string, projectSlug: string, checkSlug: string): Promise<StatusRecord[]> {
		return this.statusRecordModel.find({ groupSlug, projectSlug, checkSlug, time: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24) } });
	}
}
