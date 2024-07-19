import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'https://localhost:7105/api';

  constructor(private http:HttpClient, private tokenService: TokenService, private apiService:ApiService) {
  }

  authenticate(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = { userName: username, password: password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers, responseType: 'text' }).pipe(
      map((response: any) => {
        const token = response;
        if (token) {
          this.tokenService.setToken(token);
        }
        return { token };
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const body = { userName: username, password: password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers: headers })
  }

  isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }
}
