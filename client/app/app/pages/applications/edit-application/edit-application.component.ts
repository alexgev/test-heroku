import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationsService} from '../../../resources/services/applications.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidateService} from "../../../resources/services/validate.service";
import {ToastrService} from "ngx-toastr";
import {LoaderService} from "../../../resources/services/loader.service";

@Component({
  selector: 'edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.css'],
  providers: [ValidateService, LoaderService]
})
export class EditApplicationComponent implements OnInit {
  id: any;
  application: any = {};
  submitted: boolean = false;
  editApplicationForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private _applicationsService: ApplicationsService,
              private _router: Router,
              private _validate: ValidateService,
              private _toastr: ToastrService,
              public _loader: LoaderService) {
    this._loader.show();
    this.id = this.route.snapshot.params.appId;
    this._applicationsService.getApplicationById(this.id).then(
      res => {
        this.application = res;
        this._loader.hide();
      },
      err => {
        console.log(err);
        this._loader.hide();
      }
    )
  }

  ngOnInit() {
    this.initEditApplicationForm();
  }

  onSubmit(form) {
    if (form.valid && form.enabled) {
      this.submitted = true;
      form.disable();
      this._applicationsService.updateApplication(form.value).then(
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

  initEditApplicationForm() {
    this.editApplicationForm = new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp(this._validate.validateStringLatin().regex))
      ]),
      active: new FormControl(),
      submit: new FormControl('Save')
    });
  }
}
