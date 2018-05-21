import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PropertyService} from '../../../../../../resources/services/property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StatusService} from '../../../../../../resources/services/status.service';
import {Broadcaster} from "../../../../../../classes/broadcaster";
import {ValidateService} from "../../../../../../resources/services/validate.service";
import {ToastrService} from "ngx-toastr";
import {LoaderService} from "../../../../../../resources/services/loader.service";

@Component({
  selector: 'edit-page-page-application-property',
  templateUrl: './edit-page-page-application-property.component.html',
  styleUrls: ['./edit-page-page-application-property.component.css'],
  providers: [ValidateService, LoaderService]
})
export class EditPagePageApplicationPropertyComponent implements OnInit {
  id: any;
  property: any = {};
  submitted: boolean = false;
  appId: string;
  propertyBundleId: string;
  editPropertyForm: FormGroup;
  statuses: any = [];

  constructor(private route: ActivatedRoute,
              private _propertyService: PropertyService,
              private _router: Router,
              private _statusService: StatusService,
              public _broadcaster: Broadcaster,
              private _validate: ValidateService,
              private _toastr: ToastrService,
              public _loader: LoaderService) {
    this._loader.show();
    this.appId = this.route.snapshot.params.appId;
    this.id = this.route.snapshot.params.propId;
    this.propertyBundleId = this.route.snapshot.params.propertyId;
    this._statusService.asyncGetStatuses()
      .then(
        res => {
          this.statuses = res;
          this._loader.hide();
        },
        err => {
          console.log(err);
          this._loader.hide();
        }
      )
    this._loader.show();
    this._propertyService.getPropertyById(this.id)
      .then(
        res => {
          this.property = res;
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
      this._propertyService.updateProperty(form.value).then(
        res => {
          this._broadcaster.broadcast('requireProperties');
          this._router.navigate(['/apps', 'page', this.appId, 'property', 'page', this.propertyBundleId]);
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
    this.editPropertyForm = new FormGroup({
      id: new FormControl(this.id),
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
      propertyBundle: new FormControl(this.propertyBundleId),
      submit: new FormControl('Save')
    });
  }
}
