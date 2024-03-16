import { Config } from '../models/config.model';

export const config: Config = {
	groups: [
		{
			slug: 'kominal',
			name: 'Kominal',
			projects: [
				{
					slug: 'homepage',
					name: 'Homepage',
					checks: [
						{
							slug: 'http',
							name: 'HTTP',
							type: 'HTTP',
							url: 'https://www.kominal.com',
						},
					],
				},
				{
					slug: 'branding',
					name: 'Branding',
					checks: [
						{
							slug: 'http',
							name: 'HTTP',
							type: 'HTTP',
							url: 'https://branding.kominal.cloud',
						},
					],
				},
				{
					slug: 'flow',
					name: 'Flow',
					checks: [
						{
							slug: 'homepage',
							name: 'Homepage',
							type: 'HTTP',
							url: 'https://flow.kominal.cloud',
						},
						{
							slug: 'application',
							name: 'Application',
							type: 'HTTP',
							url: 'https://app.flow.kominal.cloud',
						},
						{
							slug: 'backend-core',
							name: 'Backend Core',
							type: 'HEALTH',
							url: 'https://flow.kominal.cloud/api/core/health',
						},
					],
				},
			],
		},
	],
};
