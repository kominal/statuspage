import { Config } from '../models/config.model';
import { Health } from '../models/health.model';

export const config: Config = {
	groups: [
		{
			slug: 'kominal',
			name: 'Kominal',
			public: true,
			projects: [
				{
					slug: 'homepage',
					name: 'Homepage',
					public: true,
					checks: [
						{
							slug: 'http',
							name: 'HTTP',
							type: 'HTTP',
							url: 'https://www.kominal.com',
							public: true,
						},
					],
				},
				{
					slug: 'branding',
					name: 'Branding',
					public: true,
					checks: [
						{
							slug: 'http',
							name: 'HTTP',
							type: 'HTTP',
							url: 'https://branding.kominal.cloud',
							public: true,
						},
					],
				},
				{
					slug: 'flow',
					name: 'Flow',
					public: true,
					checks: [
						{
							slug: 'homepage',
							name: 'Homepage',
							type: 'HTTP',
							url: 'https://flow.kominal.cloud',
							public: true,
						},
						{
							slug: 'application',
							name: 'Application',
							type: 'HTTP',
							url: 'https://app.flow.kominal.cloud',
							public: true,
						},
						{
							slug: 'backend-core',
							name: 'Backend Core',
							type: 'HEALTH',
							url: 'https://flow.kominal.cloud/api/core/health',
							public: true,
						},
					],
				},
			],
		},
	],
};

export const health: Health = {
	services: [
		{
			name: 'Database',
			status: 'ONLINE',
		},
	],
};
