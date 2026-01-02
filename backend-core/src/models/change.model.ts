import { StatusRecord } from '../entities/status-record.entity';
import { ConfigCheck, ConfigGroup, ConfigProject } from './config.model';

export interface Change {
	group: ConfigGroup;
	project: ConfigProject;
	check: ConfigCheck;
	current: Omit<StatusRecord, '_id'>;
}
