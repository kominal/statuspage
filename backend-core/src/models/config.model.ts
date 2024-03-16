export class Check {
	public slug: string;
	public name: string;
	public description?: string;
	public type: 'HTTP' | 'HEALTH';
	public url: string;
	public public: boolean;
}

export class Project {
	public slug: string;
	public name: string;
	public description?: string;
	public public: boolean;
	public checks: Check[];
}

export class Group {
	public slug: string;
	public name: string;
	public description?: string;
	public public: boolean;
	public projects: Project[];
}

export class Config {
	groups: Group[];
}
