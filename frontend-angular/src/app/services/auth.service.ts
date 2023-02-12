import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject, map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  private currentUser: Observable<User | null>;
  private subject = new Subject<any>();
  private isLoggedIn: boolean = false;

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
            localStorage.setItem('jwt-token', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.isLoggedIn = !this.isLoggedIn;
            this.subject.next(this.isLoggedIn);
          }

          return user;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwt-token');
    this.currentUserSubject.next(null);
    this.isLoggedIn = !this.isLoggedIn;
    this.subject.next(this.isLoggedIn);
    this.router.navigate(['/login']);
  }

  register(email: string, password: string, username: string) {
    return this.http.post<any>(`${environment.baseUrl}/auth/register`, {
      email,
      password,
      username,
    });
  }

  onLogin(): Observable<any> {
    return this.subject.asObservable();
  }
}
