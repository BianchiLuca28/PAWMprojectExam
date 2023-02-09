import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('jwt-token')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.baseUrl}/auth/login`, { email, password })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.accessToken) {
            // store; user; details; and; jwt; token in local
            // storage; to; keep; user; logged in between; page; refreshes;

            localStorage.setItem('jwt-token', JSON.stringify(user));
            this.currentUserSubject.next(user);
            console.log('Token aggiunto');
          }

          return user;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwt-token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(email: string, password: string, username: string) {
    return this.http.post<any>(`${environment.baseUrl}/auth/register`, {
      email,
      password,
      username,
    });
  }
}
