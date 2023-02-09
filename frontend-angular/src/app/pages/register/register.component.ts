import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  submitted = false;
  returnUrl: string = '';
  error: string = '';

  email: string = '';
  password: string = '';
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.email = '';
    this.password = '';
    this.username = '';
  }

  onSubmit() {
    this.submitted = true;

    this.error = '';
    this.authService
      .register(this.email, this.password, this.username)
      .subscribe(
        (result) => {
          this.error = '';
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.error = error.message;
        }
      );
  }
}
