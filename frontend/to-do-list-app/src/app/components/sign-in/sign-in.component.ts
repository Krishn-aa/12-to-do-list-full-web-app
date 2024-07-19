import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  type = 'password';

  authenticateUser(username: string, password: string) {
    this.authService.authenticate(username, password).subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        if (error.status === 401) {
          alert('Invalid username or password');
        } else {
          console.error('Internal Server error', error);
          alert('Internal Server error');
        }
      }
    );
  }

  togglePasswordView() {
    this.type == 'password' ? (this.type = 'text') : (this.type = 'password');
  }
}
