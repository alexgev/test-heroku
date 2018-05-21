import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from '../../../resources/services/users.service';
import {Router} from '@angular/router';
import {ValidateService} from "../../../resources/services/validate.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [ValidateService]
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;
  submitted = false;
  roles: any = [];

  constructor(private _usersService: UsersService,
              private _router: Router,
              private _validate: ValidateService,
              private _toastr: ToastrService) {
  }

  ngOnInit() {
    this._usersService.getRoles()
      .then(
        res => {
          this.roles = res;
        },
        err => console.log(err)
      )
    this.initCreateUserForm();
  }

  onSubmit(form) {
    if (form.valid && form.enabled) {
      form.disable();
      this._usersService.createUser(this.createUserForm.value).then(
        res => {
          this._router.navigate(['/users']);
          form.enable();
        },
        err => {
          console.log(err);
          form.enable();
        }
      );
    }
    else {
      this._toastr.warning('Please, fill the field correctly', 'Warning');
    }
  }

  initCreateUserForm() {
    this.createUserForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp(this._validate.validateStringWithoutNumbersLatinStrict().regex))
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp(this._validate.validateEmail().regex))
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      role: new FormControl('', Validators.required),
      active: new FormControl(),
      submit: new FormControl('Save')
    });
  }

  select() {

  }
}
