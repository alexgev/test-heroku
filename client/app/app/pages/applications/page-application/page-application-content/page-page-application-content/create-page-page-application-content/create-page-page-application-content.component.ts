import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContentUnitService} from '../../../../../../resources/services/content-unit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StatusService} from '../../../../../../resources/services/status.service';
import {Broadcaster} from '../../../../../../classes/broadcaster';
import {NgbTooltip, NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {ValidateService} from "../../../../../../resources/services/validate.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'create-page-page-application-content',
  templateUrl: './create-page-page-application-content.component.html',
  styleUrls: ['./create-page-page-application-content.component.css'],
  providers: [ValidateService, NgbTooltipConfig]
})
export class CreatePagePageApplicationContentComponent implements OnInit {
  createContentUnitForm: FormGroup;
  submitted: boolean = false;
  contentUnit: any = {};
  appId: string;
  statuses: any = [];
  contentBundle: string;
  apiLevelDisabled: boolean = false;
  archiveOptions = {
    acceptedFiles: '.zip',
    paramName: 'archive',
    maxFilesize: 50
  };
  data: any = {
    data: {}
  };
  cryptedData: any;
  icon: any;
  changeIcon: boolean = false;
  @ViewChild('tooltipData') private tooltipData: NgbTooltip;

  constructor(private _contentUnitService: ContentUnitService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _statusService: StatusService,
              public _broadcaster: Broadcaster,
              private _validate: ValidateService,
              private _toastr: ToastrService) {
    this._broadcaster.on('archiveUploaded').subscribe(
      (data: any) => {
        this.tooltipData.close();


        this.data = data;
        if (data.cryptedData)
          this.cryptedData = data.cryptedData;
        if (data.name)
          this.createContentUnitForm.controls['name'].setValue(data.name);
        if (data.version)
          this.createContentUnitForm.controls['apiLevel'].setValue(data.version);
        data.apiLevelDisabled ? this.createContentUnitForm.controls['apiLevel'].disable() : this.createContentUnitForm.controls['apiLevel'].enable();
        if (data.icon)
          this.icon = data.icon;
      }
    );
    this._broadcaster.on('iconUploaded').subscribe(
      (data: any) => {
        this.icon = data;
      }
    );
    this._broadcaster.on('removedIcon').subscribe(
      () => {
        this.icon = this.data.icon;
      }
    );
    this._broadcaster.on('removedArchive').subscribe(
      () => {
        this.data = {};
      }
    );
  }

  ngOnInit() {
    this.appId = this._route.snapshot.params.appId;

    this.contentBundle = this._route.snapshot.params.contentId;
    this.initCreateApplicationForm();
    this._statusService.asyncGetStatuses()
      .then(
        (res) => {
          this.statuses = res
        },
        (err) => console.log(err)
      )
  }

  initCreateApplicationForm() {
    this.createContentUnitForm = new FormGroup({
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
      contentBundle: new FormControl(this.contentBundle),
      submit: new FormControl('Create')
    });
  }

  onSubmit(form) {
    if (form.valid && form.enabled && this.data && this.data.data && this.data.data.id) {
      this.submitted = true;
      form.disable();
      let body = form.value;
      if (this.icon) {
        body.icon = this.icon;
      }
      body.apiLevelDisabled = this.apiLevelDisabled;
      if (this.data.data) body.data = this.data.data;
      if (this.cryptedData) body.cryptedData = this.cryptedData;
      this._contentUnitService.createContentUnit(body).then(
        res => {
          this._router.navigate(['/apps', 'page', this.appId, 'content', 'page', this.contentBundle]);
          form.enable();
        },
        err => {
          console.log(err);
          form.enable();
        }
      );
    }
    else if (!this.data.data.id) {
      this._toastr.error('Please, choose data file', 'Error');
      this.tooltipData.open();
    }
    else {
      this._toastr.warning('Please, fill the field correctly', 'Warning');
    }
  }
}
