import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private apiUrl = 'https://localhost:7105/Login/register';
  constructor(
    private authService: AuthenticationService,

    private router: Router,
    private http: HttpClient
  ) {}

  type = 'password';
  registerUser(username: string, password: string) {
    this.authService.register(username, password).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        if (error.status === 409) {
          alert('User already exists');
        } else {
          alert('Registration Successfull');
        }
      },
    });
  }
  togglePasswordView() {
    this.type == 'password' ? (this.type = 'text') : (this.type = 'password');
  }
}
