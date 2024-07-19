import { Component, OnInit } from '@angular/core';
import { TaskHeaderComponent } from '../task-header/task-header.component';
import Task from '../../models/task';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskService } from '../../services/task/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-active',
  standalone: true,
  imports: [TaskHeaderComponent, TaskListComponent],
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css'],
})
export class ActiveComponent implements OnInit {
  taskList: Task[] = [];
  subscription: Subscription = new Subscription;
  constructor(private taskService: TaskService) {}
  
  ngOnInit(): void {
    this.taskService.loadTasks();
    this.subscription = this.taskService.taskList$.subscribe((tasks) => {
      this.taskList = tasks;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
