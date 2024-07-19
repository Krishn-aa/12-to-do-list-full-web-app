  import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import Task from '../../models/task';
import { TaskService } from '../../services/task/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ProgressTrackerService } from '../../services/progress/progress-tracker.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, AddTaskComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  activePage: string = '';
  isModalOpen = false;
  taskToEdit: any = null;

  @Input() taskList: Task[] = [];

  descriptionsVisible: { [key: number]: boolean } = {};

  constructor(private taskService: TaskService, private progressTracker: ProgressTrackerService) {}

  @Output() newEvent = new EventEmitter<number>();

  getCheckboxSrc(task: Task) {
    return task.isCompleted
      ? 'assets/task-check-list-checked.svg'
      : 'assets/task-check-list-unchecked.svg';
  }

  getDeleteSrc(task: Task) {
    return task.isCompleted
      ? 'assets/delete-btn-completed.svg'
      : 'assets/delete-btn.svg';
  }

  toggleCompletionStatus(event: Event, task: Task) {
    event.stopPropagation();
    this.taskService.updateTaskStatus(task).subscribe();
  }

  toggleDescription(id: number) {
    Object.keys(this.descriptionsVisible).forEach((key) => {
      if (parseInt(key) !== id) {
        this.descriptionsVisible[parseInt(key)] = false;
      }
    });
    this.descriptionsVisible[id] = !this.descriptionsVisible[id];
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe();
  }

  getElapsedTime(createdOn: Date, completedOn: Date | null): string {
    const currentTime = new Date();
    let elapsedTime:number;
    let prefix = '';
    if (completedOn != null) {
      elapsedTime = currentTime.getTime() - new Date(completedOn).getTime();
      prefix = 'Completed';
    } else {
      elapsedTime = currentTime.getTime() - new Date(createdOn).getTime();
      prefix = 'Added';
    }

    const elapsedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60));

    if (elapsedHours >= 24) {
      const elapsedDays = Math.floor(elapsedHours / 24);
      return `${prefix} ${elapsedDays} days ago`;
    } else if (elapsedHours < 1) {
      if (elapsedMinutes <= 2) {
        return `${prefix} just now`;
      } else {
        return `${prefix} ${elapsedMinutes} minutes ago`;
      }
    } else {
      if (elapsedHours == 1) {
        return `${prefix} ${elapsedHours} hour ago`;
      } else {
        return `${prefix} ${elapsedHours} hours ago`;
      }
    }
  }

  editTask(task: Task) {
    this.taskToEdit = task;
    this.openAddTask(this.taskToEdit);
  }

  openAddTask(task: Task) {
    this.isModalOpen = true;
  }

  closeAddTask() {
    this.isModalOpen = false;
  }
}
