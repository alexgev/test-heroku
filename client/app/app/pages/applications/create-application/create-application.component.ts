import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApplicationsService} from '../../../resources/services/applications.service';
import {Router} from '@angular/router';
import {ValidateService} from "../../../resources/services/validate.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css'],
  providers: [ValidateService]
})
export class CreateApplicationComponent implements OnInit {
  createApplicationForm: FormGroup;
  submitted: boolean = false;

  constructor(private _applicationsService: ApplicationsService,
              private _router: Router,
              private _validate: ValidateService,
              private _toastr: ToastrService) {
  }

  ngOnInit() {
    this.initCreateApplicationForm();
  }

  initCreateApplicationForm() {
    this.createApplicationForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp(this._validate.validateStringLatin().regex))
      ]),
      active: new FormControl(),
      submit: new FormControl('Create')
    });
  }

  onSubmit(form) {
    if (form.valid && form.enabled) {
      this.submitted = true;
      form.disable();
      this._applicationsService.createApplication(form.value).then(
        res => {
          this._router.navigate(['/apps']);
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
}
