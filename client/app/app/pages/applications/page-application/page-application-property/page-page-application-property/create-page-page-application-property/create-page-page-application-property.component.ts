import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PropertyService} from '../../../../../../resources/services/property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StatusService} from '../../../../../../resources/services/status.service';
import {Broadcaster} from "../../../../../../classes/broadcaster";
import {ValidateService} from "../../../../../../resources/services/validate.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'create-page-page-application-property',
  templateUrl: './create-page-page-application-property.component.html',
  styleUrls: ['./create-page-page-application-property.component.css'],
  providers: [ValidateService]
})
export class CreatePagePageApplicationPropertyComponent implements OnInit {
  createPropertyForm: FormGroup;
  submitted: boolean = false;
  property: any = {};
  appId: string;
  propertyBundle: string;
  statuses: any = [];

  constructor(private _propertyService: PropertyService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _broadcaster: Broadcaster,
              private _statusService: StatusService,
              private _validate: ValidateService,
              private _toastr: ToastrService) {
  }

  ngOnInit() {
    this.appId = this._route.snapshot.params.appId;

    this.propertyBundle = this._route.snapshot.params.propertyId;
    this._statusService.asyncGetStatuses()
      .then(
        res => this.statuses = res,
        err => console.log(err)
      )
    this.initCreateApplicationForm();
  }

  initCreateApplicationForm() {
    this.createPropertyForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp(this._validate.validateStringLatin().regex))
      ]),
      active: new FormControl(),
      value: new FormControl('', [
        Validators.pattern(RegExp(this._validate.validateStringLatin().regex))
      ]),
      valueScript: new FormControl('', []),
      status: new FormControl('', [
        Validators.required,
      ]),
      propertyBundle: new FormControl(this.propertyBundle),
      submit: new FormControl('Create')
    });
  }

  onSubmit(form) {
    if (form.valid && form.enabled) {
      this.submitted = true;
      form.disable();
      this._propertyService.createProperty(form.value).then(
        res => {
          this._router.navigate(['/apps', 'page', this.appId, 'property', 'page', this.propertyBundle]);
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
