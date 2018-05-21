import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentUnitService} from '../../../../../../resources/services/content-unit.service';
import {StatusService} from '../../../../../../resources/services/status.service';
import {Broadcaster} from "../../../../../../classes/broadcaster";
import {ValidateService} from "../../../../../../resources/services/validate.service";
import {ToastrService} from "ngx-toastr";
import {LoaderService} from "../../../../../../resources/services/loader.service";

@Component({
  selector: 'edit-page-page-application-content',
  templateUrl: './edit-page-page-application-content.component.html',
  styleUrls: ['./edit-page-page-application-content.component.css'],
  providers: [ValidateService, LoaderService]
})
export class EditPagePageApplicationContentComponent implements OnInit {
  id: any;
  contentUnit: any = {
    data: {}
  };
  submitted: boolean = false;
  appId: string;
  statuses: any = [];
  contentBundleId: string;
  editContentUnitForm: FormGroup;
  changeIcon: boolean = false;
  icon: any;

  constructor(private route: ActivatedRoute,
              private _contentUnitService: ContentUnitService,
              private _router: Router,
              private _broadcaster: Broadcaster,
              private _statusService: StatusService,
              private _validate: ValidateService,
              private _toastr: ToastrService,
              public _loader: LoaderService) {

    this._loader.show();
    console.log(this.route)
    this.appId = this.route.snapshot.params.appId;
    this.id = this.route.snapshot.params.unitId;
    this.contentBundleId = this.route.snapshot.params.contentId;
    this._contentUnitService.getContentUnitById(this.id)
      .then(
        res => {
          this.contentUnit = res;
          this.icon = this.contentUnit.icon;
          this.changeIcon = !this.contentUnit.icon;
          this._loader.hide();
        },
        err => {
          console.log(err);
          this._loader.hide();
        }
      )
    this._loader.show();
    this._statusService.asyncGetStatuses()
      .then(
        (res) => {
          this.statuses = res;
          this._loader.hide();
        },
        (err) => {
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
        this.icon = this.contentUnit.icon;
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
      this._contentUnitService.updateContentUnit(body).then(
        res => {
          this._broadcaster.broadcast('requireContentUnits');
          this._router.navigate(['/apps', 'page', this.appId, 'content', 'page', this.contentBundleId]);
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
    this.editContentUnitForm = new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp(this._validate.validateStringLatin().regex))
      ]),
      active: new FormControl(),
      type: new FormControl('', [
        Validators.pattern(RegExp(this._validate.validateStringLatin().regex))
      ]),
      tags: new FormControl('', [
        Validators.pattern(RegExp(this._validate.validateStringLatin().regex))
      ]),
      order: new FormControl('', [
        Validators.pattern(RegExp(this._validate.validateNumber().regex))
      ]),
      version: new FormControl('', [
        Validators.pattern(RegExp(this._validate.validateNumber().regex))
      ]),
      apiLevel: new FormControl('', [
        Validators.pattern(RegExp(this._validate.validateNumber().regex))
      ]),
      priceLevel: new FormControl('', [
        Validators.pattern(RegExp(this._validate.validateNumber().regex))
      ]),
      status: new FormControl('', [
        Validators.required,
      ]),
      contentBundle: new FormControl(this.contentBundleId),
      submit: new FormControl('Save')
    });
  }
}
