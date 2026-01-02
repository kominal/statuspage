import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseEntity } from '../models/entity.model';

@Schema()
export class CheckState extends BaseEntity {
	@Prop()
	public groupSlug: string;

	@Prop()
	public projectSlug: string;

	@Prop()
	public checkSlug: string;

	@Prop()
	public statusCode: number;
}

export type CheckStateModel = Model<CheckState>;

export const CheckStateSchema = SchemaFactory.createForClass(CheckState).index(
	{
		groupSlug: 1,
		projectSlug: 1,
		checkSlug: 1,
	},
	{ unique: true }
);
