import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, SchemaTypes } from 'mongoose';
import { BaseEntity } from '../models/entity.model';

export enum StatusType {
	LATENCY = 'LATENCY',
	HEALTH = 'HEALTH',
}

@Schema()
export class StatusRecord extends BaseEntity {
	@Prop()
	public time: Date;

	@Prop()
	public url: string;

	@Prop()
	public statusCode: number;

	@Prop()
	public latency: number;

	@Prop()
	public type: StatusType;

	@Prop({ type: SchemaTypes.Mixed })
	public data: any;
}

export type StatusRecordModel = Model<StatusRecord>;

export const StatusRecordSchema = SchemaFactory.createForClass(StatusRecord);
