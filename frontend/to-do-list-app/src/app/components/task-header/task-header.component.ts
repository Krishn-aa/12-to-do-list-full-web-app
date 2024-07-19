import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task/task.service';
import { ParseUrlPipe } from '../../pipes/parse-url.pipe';

@Component({
  selector: 'app-task-header',
  standalone: true,
  imports: [CommonModule, ParseUrlPipe],
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.css',
  providers: [DatePipe],
})
export class TaskHeaderComponent implements OnInit {
  title =''
  formattedDate: string = '';
  activePage = this.router.url;

  constructor(private router: Router, private datePipe: DatePipe, private taskService:TaskService) {}
  ngOnInit() {
    if (this.activePage != '/dashboard') {
      this.title = this.activePage;
    }
    this.formattedDate = this.datePipe.transform(new Date(), 'EEEE, d MMMM y')!;
  }

  deleteAll(){
    this.taskService.deleteAll().subscribe(data=> console.log(data)); 
  }
}
