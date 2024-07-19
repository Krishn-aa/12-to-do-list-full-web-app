import { Component, OnInit } from '@angular/core';
import { ProgressTrackerService } from '../../../services/progress/progress-tracker.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements OnInit {
  activeProgress = 0;
  completedProgress = 100;

  constructor(private progressTracker: ProgressTrackerService) {}

  ngOnInit() {
    this.progressTracker.progress$.subscribe(progress => {
      this.activeProgress = progress;
    });
  }
}
