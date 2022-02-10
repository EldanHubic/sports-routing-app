import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://identity.multifeedcenter.com/api/Authenticate';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private ts: TokenStorageService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API,
      {
        username,
        password,
      },
      httpOptions
    );
  }

  public isAuthenticated(): boolean {
    const token = this.ts.getToken();

    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token!);
  }
}
