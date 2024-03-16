export class Service {
	public name: string;
	public status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
}

export class Health {
	public services: Service[];
}
