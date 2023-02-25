import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isUserLoggedIn: boolean = false;
  subscription: Subscription;

  constructor(private authService: AuthService) {
    // This subscription is used to keep up to date if the user is logged in (to change the content of the buttons)
    this.subscription = this.authService
      .onLogin()
      .subscribe((value) => (this.isUserLoggedIn = value));
  }

  logoutClickButton(): void {
    this.authService.logout();
  }
}
