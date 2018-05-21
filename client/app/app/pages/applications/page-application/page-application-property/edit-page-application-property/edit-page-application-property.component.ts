import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PropertyBundleService} from '../../../../../resources/services/property-bundle.service';
import {ValidateService} from "../../../../../resources/services/validate.service";
import {ToastrService} from "ngx-toastr";
import {LoaderService} from "../../../../../resources/services/loader.service";
import {Broadcaster} from "../../../../../classes/broadcaster";

@Component({
  selector: 'edit-page-application-property',
  templateUrl: './edit-page-application-property.component.html',
  styleUrls: ['./edit-page-application-property.component.css'],
  providers: [ValidateService, LoaderService]
})
export class EditPageApplicationPropertyComponent implements OnInit {
  id: any;
  propertyBundle: any = {};
  submitted: boolean = false;
  appId: string;
  editPropertyBundleForm: FormGroup;
  changeIcon: boolean = false;
  icon: any;

  constructor(private route: ActivatedRoute,
              private _propertyBundleService: PropertyBundleService,
              private _router: Router,
              private _broadcaster: Broadcaster,
              private _validate: ValidateService,
              private _toastr: ToastrService,
              public _loader: LoaderService) {
    this._loader.show();
    this.appId = this.route.snapshot.params.appId;
    this.id = this.route.snapshot.params.propertyId;
    this._propertyBundleService.getPropertyBundleById(this.id)
      .then(
        res => {
          this.propertyBundle = res;
          this.icon = this.propertyBundle.icon;
          this.changeIcon = !this.propertyBundle.icon;
          this._loader.hide();
        },
        err => {
          console.log(err);
          this._loader.hide();
        }
      )
    this._broadcaster.on('iconUploaded').subscribe(
      (data: any) => {
        this.icon = data;
      }
    );
    this._broadcaster.on('removedIcon').subscribe(
      () => {
        this.icon = this.propertyBundle.icon;
      }
    );
  }

  ngOnInit() {
    this.initEditApplicationForm();
  }

  onSubmit(form) {
    if (form.valid && form.enabled) {
      this.submitted = true;
      form.disable();
      let body = form.value;
      body.icon = this.icon;
      this._propertyBundleService.updatePropertyBundle(body).then(
        res => {
          this._router.navigate(['/apps', 'page', this.appId, 'property']);
          form.enable();
        },
        err => {
          console.log(err);
          form.enable();
        }
      );
      form.reset();
    }
    else {
      this._toastr.warning('Please, fill the field correctly', 'Warning');
    }
  }

  initEditApplicationForm() {
    this.editPropertyBundleForm = new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp(this._validate.validateStringLatin().regex))
      ]),
      active: new FormControl(),
      displayName: new FormControl('', [
        Validators.pattern(RegExp(this._validate.validateStringLatin().regex))
      ]),
      type: new FormControl('', [
        Validators.pattern(RegExp(this._validate.validateStringLatin().regex))
      ]),
      tags: new FormControl('', [
        Validators.pattern(RegExp(this._validate.validateStringLatin().regex))
      ]),
      order: new FormControl('', [
        Validators.pattern(RegExp(this._validate.validateNumber().regex))
      ]),
      submit: new FormControl('Save')
    });
  }
}
