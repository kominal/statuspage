import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, SchemaTypes } from 'mongoose';
import { BaseEntity } from '../models/entity.model';

@Schema()
export class StatusRecord extends BaseEntity {
	@Prop()
	public groupSlug: string;

	@Prop()
	public projectSlug: string;

	@Prop()
	public checkSlug: string;

	@Prop()
	public time: Date;

	@Prop()
	public statusCode: number;

	@Prop()
	public latency: number;

	@Prop({ type: SchemaTypes.Mixed })
	public data: any;
}

export type StatusRecordModel = Model<StatusRecord>;

export const StatusRecordSchema = SchemaFactory.createForClass(StatusRecord).index({
	groupSlug: 1,
	projectSlug: 1,
	checkSlug: 1,
	time: -1,
});
