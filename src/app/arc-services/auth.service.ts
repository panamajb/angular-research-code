import { Injectable } from '@angular/core';

import { JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Credential} from '../arc-models/credential.model';
import {User} from '../arc-models/user.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:8080/api-research-code';

  private user: User;

  constructor(private jwtHelper: JwtHelperService,
              private http: HttpClient,
              private router: Router,
              private _snackBar: MatSnackBar) {
  }

  public get authenticated(): boolean {
    const token = this.jwtHelper.tokenGetter();
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  public login(userCreds: Credential) {
    const url = `${this.BASE_URL}/authenticate`;
    return this.http.post(url, userCreds,{ responseType: 'text' }
    ).subscribe(tokenResult => {
      localStorage.setItem('token', tokenResult);
      this.user = new User();
      this.user.username = userCreds.username;
      this.openSnackBar('GOT:   '+tokenResult,userCreds.username);
      //this.router.navigate(['issues']);
      },
      error => {
        this.openSnackBar(error.status+'   '+ error.message,null);
      }
    );
  }
  /* Logout in AuthService simply removes token */
  public logout() {
    localStorage.removeItem('token');
    //this.router.navigate(['login']);
  }

  public get currentUser(): User {
    return this.user;
  }

  public getResource() {
    const url = `${this.BASE_URL}/myresource`;
    //localStorage.removeItem('token');
    return this.http.get(url, { responseType: 'text',
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`
      )}
    ).subscribe(resource => {
        this.openSnackBar('GOT:   '+resource,null);
      },
      error => {
        this.openSnackBar(error.status+'   '+ error.message,null);
      }
    );

  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

}
