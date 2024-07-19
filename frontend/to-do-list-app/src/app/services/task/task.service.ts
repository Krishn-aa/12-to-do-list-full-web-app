import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import Task from '../../models/task';
import { ProgressTrackerService } from '../progress/progress-tracker.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskListSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  taskList$ = this.taskListSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private progressTracker: ProgressTrackerService,
    private router: Router
  ) {}

  currentPage() {
    return this.router.url.substring(1);
  }

  getRecentTasks(): Observable<Task[]> {
    return this.apiService.get('RecentTasks').pipe(catchError(this.handleError));
  }

  getActiveTasks(): Observable<Task[]> {
    return this.apiService.get('ActiveTasks').pipe(catchError(this.handleError));
  }

  getCompletedTasks(): Observable<Task[]> {
    return this.apiService.get('CompletedTasks').pipe(catchError(this.handleError));
  }

  getAllTasks(): Observable<Task[]>{
    return this.apiService.get('AllTasks').pipe(catchError(this.handleError));
  }

  loadTasks(): void {
    switch (this.currentPage()) {
      case 'dashboard':
        this.getRecentTasks().subscribe(data=> this.taskListSubject.next(data));
        break;
      case 'active':
        this.getActiveTasks().subscribe(data=> this.taskListSubject.next(data));
        break;
      case 'completed':
        this.getCompletedTasks().subscribe(data=> this.taskListSubject.next(data));
        break;
      case 'backlog':
        this.getAllTasks().subscribe(data=> this.taskListSubject.next(data));
        break;
      default:
        this.getRecentTasks().subscribe(data=> this.taskListSubject.next(data));
        break;
    }
  }

  add(task: Task): Observable<any> {
    return this.apiService.post('AddTask', task).pipe(
      tap(() => {
        this.loadTasks();
        this.progressTracker.updateActivePercentage();
      }),
      catchError(this.handleError)
    );
  }

  update(task: Task): Observable<any> {
    return this.apiService.put('UpdateTask', task).pipe(
      tap(() => {
        this.loadTasks();
        this.progressTracker.updateActivePercentage();
      }),
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.apiService.delete('DeleteTask', id).pipe(
      tap(() => {
        this.loadTasks();
        this.progressTracker.updateActivePercentage();
      }),
      catchError(this.handleError)
    );
  }

  deleteAll(): Observable<any> {
    return this.apiService.deleteAll('DeleteAll').pipe(
      tap(() => {
        this.loadTasks();
        this.progressTracker.updateActivePercentage();
      }),
      catchError(this.handleError)
    );
  }

  updateTaskStatus(task: Task): Observable<any> {
    return this.apiService.put('UpdateTaskStatus', task).pipe(
      tap(() => {
        this.loadTasks();
        this.progressTracker.updateActivePercentage();
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened, please try again later.'));
  }
}
