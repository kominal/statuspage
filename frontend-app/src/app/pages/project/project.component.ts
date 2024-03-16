import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StatusApi } from 'backend-core-client';
import { LatencyHistoryComponent } from '../../components/latency-history/latency-history.component';
import { StatusIconComponent } from '../../components/status-icon/status-icon.component';

@Component({
	selector: 'status-project',
	standalone: true,
	imports: [CommonModule, LatencyHistoryComponent, StatusIconComponent, RouterModule],
	templateUrl: './project.component.html',
	styleUrl: './project.component.scss',
})
export class ProjectComponent {
	@HostBinding('class')
	public classes = 'surface-ground h-full flex flex-column gap-3 overflow-auto p-4';

	public checks$ = this.statusApi.statusControllerReadChecks({
		groupSlug: this.activatedRoute.snapshot.params['groupSlug'],
		projectSlug: this.activatedRoute.snapshot.params['projectSlug'],
	});

	public constructor(private statusApi: StatusApi, private activatedRoute: ActivatedRoute) {}
}
