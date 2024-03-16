import { Prop } from '@nestjs/mongoose';

export abstract class BaseEntity {
	public _id: string;

	@Prop()
	public uuid: string;

	@Prop()
	public createdAt: Date;

	@Prop()
	public createdBy: string;

	@Prop()
	public changedAt: Date;

	@Prop()
	public changedBy: string;
}

export const TECHNICAL_KEYS_BASE_ENTITY: (keyof BaseEntity)[] = ['_id', 'uuid', 'createdAt', 'createdBy', 'changedAt', 'changedBy'];

export abstract class TenantEntity extends BaseEntity {
	@Prop()
	public tenantSlug: string;
}

export const TECHNICAL_KEYS: (keyof TenantEntity)[] = ['_id', 'uuid', 'createdAt', 'createdBy', 'changedAt', 'changedBy', 'tenantSlug'];
