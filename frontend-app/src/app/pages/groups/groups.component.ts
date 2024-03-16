import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatusApi } from 'backend-core-client';
import { StatusIconComponent } from '../../components/status-icon/status-icon.component';

@Component({
	selector: 'status-groups',
	standalone: true,
	imports: [CommonModule, StatusIconComponent, RouterModule],
	templateUrl: './groups.component.html',
	styleUrl: './groups.component.scss',
})
export class GroupsComponent {
	@HostBinding('class')
	public classes = 'surface-ground h-full flex flex-column gap-3 overflow-auto p-4';

	public groups$ = this.statusApi.statusControllerReadGroups();

	public constructor(private statusApi: StatusApi) {}
}
