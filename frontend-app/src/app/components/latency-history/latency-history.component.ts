import { Component } from '@angular/core';

@Component({
	selector: 'status-latency-history',
	standalone: true,
	imports: [],
	templateUrl: './latency-history.component.html',
	styleUrl: './latency-history.component.scss',
})
export class LatencyHistoryComponent {
	public values = new Array(1440).fill(0).map((_, i) => i);
}
