import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  onSubmit(loginData) {
    this.userService.authUser(loginData).subscribe((data) => {
      if (data) {
        this.userService.setToken(data.token);
        this.userService.setUser(data.user);
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
