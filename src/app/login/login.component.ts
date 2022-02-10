import { Component, Input, OnInit, Output } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn: boolean = false;
  @Output() isLoggedInEmit = new EventEmitter<boolean>();

  isLoginFailed: boolean = false;
  errorMessage = '';

  ngOnInit(): void {
    //ako postoji token, to znači da je user logovan
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  //nakon klika na button login
  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: (data) => {
        //uzimanje tokena iz propertija koji se dobio nakon subscribe
        let token = data.token;
        //dekodiranje dobijenog tokena
        let decodedToken = jwtDecode(token);
        this.tokenStorage.saveToken(token);
        console.log(token);
        console.log(decodedToken);
        this.tokenStorage.saveUser(decodedToken);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log('Login success!');
        this.isLoggedInEmit.emit(true);
        this.router.navigate(['sports']);
        
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}
