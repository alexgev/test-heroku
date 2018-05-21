import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContentBundleService} from '../../../../../resources/services/content-bundle.service';
import {ValidateService} from "../../../../../resources/services/validate.service";
import {ToastrService} from "ngx-toastr";
import {LoaderService} from "../../../../../resources/services/loader.service";
import {Broadcaster} from "../../../../../classes/broadcaster";

@Component({
  selector: 'edit-page-application-content',
  templateUrl: './edit-page-application-content.component.html',
  styleUrls: ['./edit-page-application-content.component.css'],
  providers: [ValidateService, LoaderService]
})
export class EditPageApplicationContentComponent implements OnInit {
  id: any;
  contentBundle: any = {};
  submitted: boolean = false;
  appId: string;
  editContentBundleForm: FormGroup;
  changeIcon: boolean = false;
  icon: any;

  constructor(private route: ActivatedRoute,
              private _contentBundleService: ContentBundleService,
              private _router: Router,
              private _broadcaster: Broadcaster,
              private _validate: ValidateService,
              private _toastr: ToastrService,
              public _loader: LoaderService) {
    this._loader.show();
    this.appId = this.route.snapshot.params.appId;
    this.id = this.route.snapshot.params.contentId;
    this._contentBundleService.getContentBundleById(this.id).then(
      res => {
        this.contentBundle = res;
        this.icon = this.contentBundle.icon;
        this.changeIcon = !this.contentBundle.icon;
        this._loader.hide();
      },
      err => {
        console.log(err);
        this._loader.hide();
      }
    );
    this._broadcaster.on('iconUploaded').subscribe(
      (data: any) => {
        this.icon = data;
      }
    );
    this._broadcaster.on('removedIcon').subscribe(
      () => {
        this.icon = this.contentBundle.icon;
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
      this._contentBundleService.updateContentBundle(body).then(
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

  initEditApplicationForm() {
    this.editContentBundleForm = new FormGroup({
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
