import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../resources/services/users.service";
import {Router} from "@angular/router";
import {ValidateService} from "../../resources/services/validate.service";
import {ToastrService} from "ngx-toastr";
import {LoaderService} from "../../resources/services/loader.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ValidateService, LoaderService]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  submitted = false;
  roles: any = [];
  data: any = {
    user: {
      email: '',
      name: ''
    }
  };

  constructor(private _usersService: UsersService,
              private _router: Router,
              private _validate: ValidateService,
              private _toastr: ToastrService,
              public _loader: LoaderService) {
    this._loader.show();
    this._usersService.getCollaboratorById()
      .then(
        res => {
          console.log('collaborator', res);
          this.data = res;
          this._loader.hide();
        },
        err => {
          console.log(err);
          this._loader.hide();
        }
      )
  }

  ngOnInit() {
    this.initProfileForm();
  }

  onSubmit(form) {
    if (form.valid && form.enabled) {
      if (this.profileForm.value.password != this.profileForm.value.confirmPassword)
        return this._toastr.warning('Passwords do not match', 'Warning');
      form.disable();
      this._usersService.updateMe(this.profileForm.value).then(
        res => {
          form.enable();
          this._toastr.success('Your profile has been updated', 'Success')
        },
        err => {
          console.log(err);
          this._toastr.error(err.error.description, 'Error')
          form.enable();
        }
      );
    }
    else {
      this._toastr.warning('Please, enter correct fields', 'Warning');
    }
  }

  initProfileForm() {
    this.profileForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp(this._validate.validateStringWithoutNumbersLatinStrict().regex))
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp(this._validate.validateEmail().regex))
      ]),
      password: new FormControl('', []),
      confirmPassword: new FormControl('', []),
      submit: new FormControl('Save')
    });
  }
}
