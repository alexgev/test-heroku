import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContentBundleService} from '../../../../../resources/services/content-bundle.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Broadcaster} from '../../../../../classes/broadcaster';
import {ValidateService} from "../../../../../resources/services/validate.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'create-page-application-content',
  templateUrl: './create-page-application-content.component.html',
  styleUrls: ['./create-page-application-content.component.css'],
  providers: [ValidateService]
})
export class CreatePageApplicationContentComponent implements OnInit {
  createContentBundleForm: FormGroup;
  submitted: boolean = false;
  contentBundle: any = {};
  appId: string;
  icon: any;

  constructor(private _contentBundleService: ContentBundleService,
              private _router: Router,
              public _broadcaster: Broadcaster,
              private _validate: ValidateService,
              private _toastr: ToastrService,
              private _route: ActivatedRoute) {
    this._broadcaster.on('iconUploaded').subscribe(
      (data: any) => {
        this.icon = data;
      }
    );
    this._broadcaster.on('removedIcon').subscribe(
      () => {
        this.icon = null;
      }
    );
  }

  ngOnInit() {
    this.appId = this._route.snapshot.params.appId;
    this.initCreateApplicationForm();
  }

  initCreateApplicationForm() {
    this.createContentBundleForm = new FormGroup({
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
      app: new FormControl(this.appId),
      submit: new FormControl('Create')
    });
  }

  onSubmit(form) {
    if (form.valid && form.enabled) {
      this.submitted = true;
      form.disable();
      let body = form.value;
      if (this.icon) {
        body.icon = this.icon;
      }
      this._contentBundleService.createContentBundle(body).then(
        res => {
          this._router.navigate(['/apps', 'page', this.appId, 'content']);
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
