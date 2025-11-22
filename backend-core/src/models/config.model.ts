export class ConfigCheck {
	public slug: string;
	public name: string;
	public description?: string;
	public type: 'HTTP' | 'HEALTH';
	public url: string;
	public public: boolean;
}

export class ConfigProject {
	public slug: string;
	public name: string;
	public description?: string;
	public public: boolean;
	public checks: ConfigCheck[];
}

export class ConfigGroup {
	public slug: string;
	public name: string;
	public description?: string;
	public public: boolean;
	public projects: ConfigProject[];
	public recipients?: string[];
	public alertOn?: string[];
}

export class Config {
	groups: ConfigGroup[];
}
