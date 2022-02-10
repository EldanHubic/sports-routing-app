import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  //signout
  signOut(): void {
    window.sessionStorage.clear();
  }

  //spremi token
  public saveToken(token: string): void {
    //ukloni prethodni token
    window.sessionStorage.removeItem(TOKEN_KEY);
    //dodaj novi token
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  //dohvati jwt token
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  //spremi useri koji se logirao
  public saveUser(user: any): void {
    //ukloni prethodnog usera
    window.sessionStorage.removeItem(USER_KEY);
    //dodaj novog usera
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  //dohvati usera
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user); //pretvara user string u js objekat
      
    }

    return {};
  }
}
