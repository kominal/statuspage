import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
	selector: 'status-status-icon',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './status-icon.component.html',
	styleUrl: './status-icon.component.scss',
})
export class StatusIconComponent implements OnChanges {
	@Input() public status: string | undefined;

	public colorClass: string = 'bg-gray-600';

	public iconClass: string = 'pi-question';

	public ngOnChanges(): void {
		if (this.status === 'ONLINE') {
			this.colorClass = 'bg-green-600';
			this.iconClass = 'pi-check';
		} else if (this.status === 'OFFLINE') {
			this.colorClass = 'bg-red-600';
			this.iconClass = 'pi-exclamation-triangle';
		} else if (this.status === 'DEGRADED') {
			this.colorClass = 'bg-yellow-500';
			this.iconClass = 'pi-clock';
		} else {
			this.colorClass = 'bg-gray-600';
			this.iconClass = 'pi-question';
		}
	}
}
