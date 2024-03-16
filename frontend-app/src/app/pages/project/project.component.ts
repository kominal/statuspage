import { Component } from '@angular/core';
import { LatencyHistoryComponent } from '../../components/latency-history/latency-history.component';

@Component({
	selector: 'status-project',
	standalone: true,
	imports: [LatencyHistoryComponent],
	templateUrl: './project.component.html',
	styleUrl: './project.component.scss',
})
export class ProjectComponent {}
