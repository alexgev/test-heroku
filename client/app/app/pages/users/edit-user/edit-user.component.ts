import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../../resources/services/users.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidateService} from "../../../resources/services/validate.service";
import {ToastrService} from "ngx-toastr";
import {LoaderService} from "../../../resources/services/loader.service";

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [ValidateService, LoaderService]
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  user: any = {};
  data: any = {
    user: {},
    role: {},
    organization: {}
  };
  roles: any = [];
  submitted: boolean = false;
  userId: any;

  constructor(private route: ActivatedRoute,
              private _usersService: UsersService,
              private _router: Router,
              private _validate: ValidateService,
              private _toastr: ToastrService,
              public _loader: LoaderService) {
    this._loader.show();
    this.userId = this.route.snapshot.params.userId;
    this._usersService.getCollaboratorById(this.userId)
      .then(
        res => {
          this.data = res;
          this._loader.hide();
        },
        err => {
          console.log(err);
          this._loader.hide();
        }
      );
    this._loader.show();
    this._usersService.getRoles()
      .then(
        res => {
          this.roles = res;
          this._loader.hide();
        },
        err => {
          console.log(err);
          this._loader.hide();
        }
      )
  }

  ngOnInit() {


    this.initEditUserForm();
  }

  onSubmit(form) {
    if (form.valid && form.enabled) {
      form.disable();
      this.submitted = true;
      this._usersService.updateCollaborator(form.value).then(
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

  initEditUserForm() {
    this.editUserForm = new FormGroup({
      id: new FormControl(this.userId),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp(this._validate.validateStringWithoutNumbersLatinStrict().regex))
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp(this._validate.validateEmail().regex))
      ]),
      role: new FormControl('', Validators.required),
      active: new FormControl(),
      submit: new FormControl('Save')
    });
  }
}
