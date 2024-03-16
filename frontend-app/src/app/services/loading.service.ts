import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, shareReplay, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoadingService {
	public loading$ = new BehaviorSubject<string[]>([]);

	public isLoading$ = this.loading$.asObservable().pipe(
		map((loading) => loading.length > 0),
		debounceTime(10),
		distinctUntilChanged(),
		tap((loading) => {
			if (loading) {
				(document.activeElement as HTMLElement)?.blur();
			}
		}),
		shareReplay(1)
	);

	public startLoading(type: string): void {
		if (!this.loading$.value.includes(type)) {
			this.loading$.next(this.loading$.value.concat(type));
		}
	}

	public stopLoading(type: string): void {
		if (this.loading$.value.includes(type)) {
			this.loading$.next(this.loading$.value.filter((t) => t !== type));
		}
	}
}
