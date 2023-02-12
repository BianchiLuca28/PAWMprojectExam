import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  returnUrl: string = '';
  error: string = '';

  email: string = '';
  password: string = '';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }

  onSubmit() {
    this.submitted = true;

    this.error = '';
    this.authService
      .login(this.email, this.password)
      .pipe(first())
      .subscribe(
        (data) => {
          this.error = '';
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.error = error;
        }
      );
  }
}
