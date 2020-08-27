import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
    private flashMessagesService: FlashMessagesService
  ) {}

  loggedIn() {
    return !this.jwtHelperService.isTokenExpired(this.getToken());
  }

  setUser(user): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setToken(token) {
    localStorage.setItem('id_token', token);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  authUser(user): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .post('/api/auth', user, {
        headers: httpHeaders,
      })
      .pipe(catchError(this.errorHandler()));
  }

  logoutUser() {
    localStorage.clear();
  }

  createUser(user): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .post('/api/users', user, {
        headers: httpHeaders,
      })
      .pipe(catchError(this.errorHandler()));
  }

  updateUser(user): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': this.getToken(),
    });

    return this.httpClient
      .patch('/api/users', user, {
        headers: httpHeaders,
      })
      .pipe(catchError(this.errorHandler()));
  }

  deleteuser(): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': this.getToken(),
    });

    return this.httpClient
      .delete('/api/users', {
        headers: httpHeaders,
      })
      .pipe(catchError(this.errorHandler()));
  }

  errorHandler() {
    return (error: any): Observable<any> => {
      if (error.status === 0) {
        this.flashMessagesService.show('Network Error', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      } else if (error.status === 400) {
        this.flashMessagesService.show(error.error.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      } else if (error.status > 400) {
        this.flashMessagesService.show(error.statusText, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      } else if (error.status >= 500) {
        this.flashMessagesService.show(
          "Can't seem to reach server at the moment",
          {
            cssClass: 'alert-danger',
            timeout: 3000,
          }
        );
      }

      return of(null);
    };
  }
}
