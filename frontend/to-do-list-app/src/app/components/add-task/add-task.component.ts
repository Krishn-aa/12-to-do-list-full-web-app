import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task/task.service';
import Task from '../../models/task';


@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnChanges {
  @Input() defaultData: Partial<Task> = {
    title: '',
    description: '',
    isCompleted: false,
  };

  @Input() isUpdate = false;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  title: string = '';
  description: string = '';

  constructor(
    private taskService: TaskService,
  ) {}

  ngOnChanges() {
    if (this.defaultData != null) {
      this.title = this.defaultData.title || '';
      this.description = this.defaultData.description || '';
    }
  }

  addTask() {
    let newTask: Task = new Task(
      this.title,
      this.description,
      false,
    );
    if (newTask.title === '') {
      alert('Please enter task title');
    } else {
      this.taskService.add(newTask).subscribe((res) => {
        this.close.emit();
      });
    }
  }

  updateTask() {
    let updatedTask: Task = new Task(
      this.title,
      this.description,
      this.defaultData.isCompleted || false,
      this.defaultData.createdOn || new Date(),
      this.defaultData.modifiedOn || new Date(),
      this.defaultData.id
    );

    this.taskService.update(updatedTask).subscribe((res) => {
      this.close.emit();
    });
  }

  handleForm() {
    if (this.isUpdate) {
      this.updateTask();
    } else {
      this.addTask();
    }
  }

  closeModal() {
    this.close.emit();
    this.description = '';
    this.title = '';
  }
}
