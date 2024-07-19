import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskHeaderComponent } from '../task-header/task-header.component';
import { TaskListComponent } from '../task-list/task-list.component';
import Task from '../../models/task';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task/task.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [
    CommonModule,
    TaskHeaderComponent,
    TaskListComponent,
    CustomDatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  providers: [CustomDatePipe, provideNativeDateAdapter()],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css',
})
export class BacklogComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  taskListByDate: { date: string; tasks: Task[] }[] = [];

  minDate: Date = new Date();
  maxDate = new Date();

  constructor(
    private taskService: TaskService,
    private customDatePipe: CustomDatePipe
  ) {}

  ngOnInit(): void {
    this.taskService.loadTasks();

    this.subscription = this.taskService.taskList$.subscribe((tasks) => {
      this.taskListByDate = [];
      if (tasks.length > 0) {
        this.minDate = tasks[tasks.length - 1].createdOn!;
        this.maxDate.setDate(new Date().getDate() - 1);
      }

      tasks.forEach((task) => {
        const createdDate = new Date(task.createdOn!).toLocaleDateString();
        const index = this.taskListByDate.findIndex(
          (item) => item.date === createdDate
        );
        if (index === -1) {
          this.taskListByDate.push({ date: createdDate, tasks: [task] });
        } else {
          this.taskListByDate[index].tasks.push(task);
        }
      });
    });
  }

  scrollToSelectedDate(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    const stringDate = selectedDate?.toDateString();
    const formattedDate = this.customDatePipe.transform(stringDate!);

    const element = document.getElementById(formattedDate!);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
