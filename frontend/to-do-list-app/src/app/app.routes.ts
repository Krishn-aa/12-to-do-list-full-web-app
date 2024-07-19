import { Routes } from '@angular/router';
import { MainComponent } from './components/layout/main/main.component';
import { PublicComponent } from './components/layout/public/public.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActiveComponent } from './components/active/active.component';
import { CompletedComponent } from './components/completed/completed.component';
import { authGuard } from './services/auth-guard/auth.guard';
import { BacklogComponent } from './components/backlog/backlog.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'active', component: ActiveComponent, canActivate: [authGuard] },
      { path: 'completed', component: CompletedComponent, canActivate: [authGuard] },
      { path: 'backlog', component: BacklogComponent, canActivate: [authGuard] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'signin',component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: '**', redirectTo: 'signin', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'signin' ,pathMatch: 'full' },
];
