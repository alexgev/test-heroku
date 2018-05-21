import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../resources/services/auth.service";
import {ValidateService} from "../../../resources/services/validate.service";
import {ToastrService} from "ngx-toastr";

/**
 * Страница "Логин"
 */
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [ValidateService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _validate: ValidateService,
              private _toastr: ToastrService) {
  }

  ngOnInit() {
    this.initLoginForm();
  }

  /**
   * Объявление свойств, хранящих значения полей. Вставлены значения по умолчанию
   */
  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp(this._validate.validateEmail().regex))
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      submit: new FormControl('Sign In')
    });
  }

  onSubmitLoginForm(form) {
    if (form.valid && form.enabled) {
      form.disable();
      this._authService.logIn(form.value.email, form.value.password).then(
        res => {
          form.enable();
        },
        err => {
          console.log(err);
          form.enable();
        }
      );
    }
    else {
      this._toastr.warning('Please, enter correct fields', 'Warning');
    }
  }
}
