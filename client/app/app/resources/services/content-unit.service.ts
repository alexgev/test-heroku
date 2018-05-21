import {EventEmitter, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {RequestOption} from "../../classes/request-options";
import {UrlService} from "./url.service";

@Injectable()
export class ContentUnitService {
  public onDisableContentUnit: EventEmitter<boolean> = new EventEmitter(true);
  public onDestroyContentUnit: EventEmitter<boolean> = new EventEmitter(true);

  constructor(private _http: HttpClient,
              private _urlService: UrlService,
              private _toastr: ToastrService,
              private _router: Router,
              private _requestOption: RequestOption) {
  }

  asyncGetContentUnits(id) {
    let asyncGetContentUnitsPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getContentUnits(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          resolve(this.getStatusName(this.getImageLocation(res)));
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return asyncGetContentUnitsPromise;
  }

  disableContentUnit(id) {
    let disableContentUnitPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.disableContentUnit(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          this.onDisableContentUnit.emit();
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return disableContentUnitPromise;
  }

  getContentUnitById(id) {
    let getContentUnitByIdPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getContentUnitById(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return getContentUnitByIdPromise;
  }

  updateContentUnit(contentUnit) {
    let updateContentUnitPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.updateContentUnit(), contentUnit, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return updateContentUnitPromise;
  }

  createContentUnit(contentUnit) {
    let createContentUnitPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.createContentUnit(), contentUnit, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return createContentUnitPromise;
  }

  getStatusName(res) {
    res.contentUnits.forEach(elem => {
      elem.status = elem.status.name;
    });
    return res;
  }

  destroyContentUnit(id) {
    let destroyContentUnitPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.destroyContentUnit(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          this.onDestroyContentUnit.emit();
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return destroyContentUnitPromise;
  }

  getImageLocation(contentBundleWithContentUnits) {
    contentBundleWithContentUnits.contentUnits.forEach(elem => {
      if (elem.icon) elem.icon = elem.icon.Location
    });
    return contentBundleWithContentUnits;
  }
}
