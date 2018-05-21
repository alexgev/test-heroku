import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../resources/services/auth.service";

@Component({
  selector: 'sign-up',
  templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router) {
  }

  ngOnInit() {
    this.initSignUpForm();
  }

  /**
   * Объявление свойств, хранящих значения полей. Вставлены значения по умолчанию
   */
  initSignUpForm() {
    this.signUpForm = this._formBuilder.group({
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  onSubmitSignUpForm() {
    this._authService.asyncSignUp(true, this.signUpForm.value);
  }
}
