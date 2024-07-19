import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProgressTrackerService {
  private progressSource = new BehaviorSubject<number>(0);
  progress$ = this.progressSource.asObservable();

  constructor(private apiService: ApiService) {
    this.updateActivePercentage();
  }

  updateActivePercentage() {
    this.apiService.get('Progress').subscribe(data => this.progressSource.next(data));
  }
}
