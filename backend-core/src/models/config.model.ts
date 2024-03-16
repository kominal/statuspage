export class Check {
	public slug: string;
	public name: string;
	public description?: string;
	public type: 'HTTP' | 'HEALTH';
	public url: string;
}

export class Project {
	public slug: string;
	public name: string;
	public description?: string;
	public checks: Check[];
}

export class Group {
	public slug: string;
	public name: string;
	public description?: string;
	public projects: Project[];
}

export class Config {
	groups: Group[];
}
