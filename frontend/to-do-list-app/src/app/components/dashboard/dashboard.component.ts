import { Component, OnInit } from '@angular/core';
import { WelcomeBannerComponent } from './welcome-banner/welcome-banner.component';
import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskHeaderComponent } from '../task-header/task-header.component';
import Task from '../../models/task';
import { TaskService } from '../../services/task/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    WelcomeBannerComponent,
    ProgressTrackerComponent,
    TaskListComponent,
    TaskHeaderComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  taskList: Task[] = [];
  subscription:Subscription=new Subscription();
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskService.loadTasks(); 
    this.subscription = this.taskService.taskList$.subscribe((tasks) => {
      this.taskList = tasks;
      this.sortTasks();
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private sortTasks(): void {
    this.taskList.sort((a, b) => {
      if (a.isCompleted === b.isCompleted) return 0;
      return a.isCompleted ? 1 : -1;
    });
  }
}