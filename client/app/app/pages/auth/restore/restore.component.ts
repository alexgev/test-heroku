import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../resources/services/auth.service";

@Component({
  selector: 'restore',
  templateUrl: './restore.component.html'
})
export class RestoreComponent implements OnInit {
  restoreForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router) {
  }

  ngOnInit() {
    this.initRestoreForm();
  }

  /**
   * Объявление свойств, хранящих значения полей. Вставлены значения по умолчанию
   */
  initRestoreForm() {
    this.restoreForm = this._formBuilder.group({
      email: ''
    })
  }

  onSubmitRestoreForm() {
    this._authService.restore(true, this.restoreForm.value.email);
  }
}
