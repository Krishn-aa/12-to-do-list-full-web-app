import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskHeaderComponent } from '../task-header/task-header.component';
import { TaskService } from '../../services/task/task.service';
import Task from '../../models/task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [TaskListComponent, TaskHeaderComponent],
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css'],
})
export class CompletedComponent implements OnInit {
  taskList: Task[] = [];
  subscription: Subscription = new Subscription();
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.loadTasks();
    this.subscription = this.taskService.taskList$.subscribe((tasks) => {
      this.taskList = tasks;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
