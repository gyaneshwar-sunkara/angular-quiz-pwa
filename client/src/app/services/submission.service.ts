import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FlashMessagesService } from 'angular2-flash-messages';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
    private flashMessagesService: FlashMessagesService,
    private userService: UserService
  ) {}

  setCurrentScore(score) {
    localStorage.setItem('currentScore', score);
  }

  getCurrentScore() {
    return parseInt(localStorage.getItem('currentScore'));
  }

  removeCurrentScore() {
    localStorage.removeItem('currentScore');
  }

  setCurrentSubmission(id) {
    localStorage.setItem('currentSubmission', id);
  }

  getCurrentSubmission() {
    return localStorage.getItem('currentSubmission');
  }

  removeCurrentSubmission() {
    localStorage.removeItem('currentSubmission');
  }

  createSubmission(score): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': this.userService.getToken(),
    });

    return this.httpClient
      .post(
        '/api/submissions',
        { score },
        {
          headers: httpHeaders,
        }
      )
      .pipe(catchError(this.errorHandler()));
  }

  readSubmissions(): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': this.userService.getToken(),
    });

    return this.httpClient
      .get('/api/submissions', {
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
