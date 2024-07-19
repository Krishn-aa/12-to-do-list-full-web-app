import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ParseUrlPipe } from '../../../pipes/parse-url.pipe';
import { filter } from 'rxjs/operators';
import { TokenService } from '../../../services/token/token.service';
import { AddTaskComponent } from '../../add-task/add-task.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ParseUrlPipe, AddTaskComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  activePage: string = '';

  constructor(private router: Router, private activatedRoute:ActivatedRoute, private tokenService:TokenService) {}
  isModalOpen: boolean = false;
  ngOnInit() {
    this.updateActivePage(this.router.url);

    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.updateActivePage(event.urlAfterRedirects);
    });

    // this.activatedRoute.data.subscribe(data => this.activePage=data['name']);
  }

  updateActivePage(url: string) {
    this.activePage = url;
  }

  signOut() {
    this.tokenService.deleteToken();
    this.router.navigate(['/signin']);
  }

  openAddTask() {
    this.isModalOpen = true;
  }

  closeAddTask() {
    this.isModalOpen = false;
  }
  
}