import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { v4 } from 'uuid';
import { HeaderComponent } from './components/header/header.component';
import { LoadingService } from './services/loading.service';

@Component({
	selector: 'status-root',
	standalone: true,
	imports: [CommonModule, ProgressSpinnerModule, RouterModule, HeaderComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	public constructor(public loadingService: LoadingService, private primengConfig: PrimeNGConfig) {
		const origOpen = XMLHttpRequest.prototype.open;
		XMLHttpRequest.prototype.open = function (): void {
			const requestId = v4();
			const url: string = arguments[1];
			if (url.includes('/api/core/') && !url.endsWith('preview')) {
				loadingService.startLoading(`HTTP-${requestId}`);
				this.addEventListener('abort', () => loadingService.stopLoading(`HTTP-${requestId}`));
				this.addEventListener('error', () => loadingService.stopLoading(`HTTP-${requestId}`));
				this.addEventListener('loadend', () => loadingService.stopLoading(`HTTP-${requestId}`));
			}
			origOpen.apply(this, arguments as any);
		};
	}

	public ngOnInit(): void {
		this.primengConfig.ripple = true;
	}
}
