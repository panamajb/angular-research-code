import { Injectable } from '@angular/core';

import { JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Credential} from '../arc-models/credential.model';
import {User} from '../arc-models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private BASE_URL = 'http://localhost:8081/ims-users/resources';

  private user: User;

  constructor(private jwtHelper: JwtHelperService,
              private http: HttpClient,
              private router: Router) {
  }

  public getauthenticated(): boolean {
    const token = this.jwtHelper.tokenGetter();
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  public login(userCreds: Credential) {
    const url = `${this.BASE_URL}/users/authenticate`;
    return this.http.post(url, userCreds,
      { responseType: 'text' }
    ).subscribe(tokenResult => {
      localStorage.setItem('token', tokenResult);
      this.user = new User();
      this.user.name = userCreds.username;

      this.router.navigate(['issues']);
    });
  }
  /* Logout in AuthService simply removes token */
  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  public get currentUser(): User {
    return this.user;
  }




}
