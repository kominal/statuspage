import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
	selector: 'status-header',
	standalone: true,
	imports: [MenubarModule, RouterModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {}
