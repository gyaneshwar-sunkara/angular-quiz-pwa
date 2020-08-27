import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  onSubmit(registerData) {
    this.userService.createUser(registerData).subscribe((data) => {
      if (data) {
        this.userService.setToken(data.token);
        this.userService.setUser(data.user);
        this.registerForm.reset();
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
