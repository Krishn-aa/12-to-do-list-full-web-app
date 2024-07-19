import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';

import { AddTaskComponent } from '../../add-task/add-task.component';

@Component({
  selector: 'app-sidepanel',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule, AddTaskComponent],
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.css'],
})
export class SidepanelComponent {
  isMenuOpen: boolean = false;
  selectedMenu: string = 'Dashboard';
  activePage: string = 'dashboard';
  isModalOpen: boolean = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
    this.isMenuOpen = false;
  }


  openAddTask() {
    this.isModalOpen = true;
  }

  closeAddTask() {
    this.isModalOpen = false;
  }
}