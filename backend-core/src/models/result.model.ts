export enum Status {
	ONLINE = 'ONLINE',
	DEGRADED = 'DEGRADED',
	OFFLINE = 'OFFLINE',
}

export class Check {
	public slug: string;
	public name: string;
	public description?: string;
	public status: Status;
	public latencies: number[];
	public data: any;
}

export class Project {
	public slug: string;
	public name: string;
	public description?: string;
	public status: Status;
}

export class Group {
	public slug: string;
	public name: string;
	public description?: string;
	public status: Status;
}
