import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
	selector: 'status-latency-history',
	standalone: true,
	imports: [TooltipModule],
	templateUrl: './latency-history.component.html',
	styleUrl: './latency-history.component.scss',
})
export class LatencyHistoryComponent implements OnChanges {
	@HostBinding('class')
	public classes = 'surface-ground h-full flex flex-column gap-3 overflow-auto';

	@Input() public latencies: number[] = [];

	public normalizedLatencies: { latency: number; percentage: number }[] = [];

	public ngOnChanges(): void {
		const max = Math.max(...this.latencies);
		this.normalizedLatencies = this.latencies.map((latency) => ({ latency, percentage: (100 / max) * latency }));
	}
}
