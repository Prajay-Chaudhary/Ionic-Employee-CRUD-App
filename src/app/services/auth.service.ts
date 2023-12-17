import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/users';
  private isAuthenticated = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.authUrl}?username=${username}&password=${password}`)
      .pipe(
        tap(users => {
          if (users.length > 0) {
            this.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true');
          }
        })
      );
  }
  
  register(user: any): Observable<any> {
    return this.http.post(this.authUrl, user);
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }
  
  isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  
}
