import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}
  isLoggedIn = false;
  username: string = '';
  _router = this.router;

  change(value: boolean) {
    this.isLoggedIn = value;
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.isLoggedIn);

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }

  navigateToSports(): void {
    this.router.navigate(['sports']);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    console.log('signed-out');

    this.router.navigate(['home']);
  }
}
