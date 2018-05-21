import {EventEmitter, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {RequestOption} from "../../classes/request-options";
import {UrlService} from "./url.service";

@Injectable()
export class PropertyBundleService {
  public onDisablePropertyBundle: EventEmitter<boolean> = new EventEmitter(true);
  public onDestroyPropertyBundle: EventEmitter<boolean> = new EventEmitter(true);

  constructor(private _http: HttpClient,
              private _urlService: UrlService,
              private _toastr: ToastrService,
              private _router: Router,
              private _requestOption: RequestOption) {
  }

  asyncGetPropertyBundles(id) {
    let asyncGetPropertyBundlesPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getPropertyBundles(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          resolve(this.getImageLocation(res));
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return asyncGetPropertyBundlesPromise;
  }

  disablePropertyBundle(id) {
    let disablePropertyBundlePromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.disablePropertyBundle(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          this.onDisablePropertyBundle.emit();
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return disablePropertyBundlePromise;
  }

  getPropertyBundleById(id) {
    let getPropertyBundleByIdPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getPropertyBundleById(), {id: id}, this._requestOption.options)
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
    return getPropertyBundleByIdPromise;
  }

  updatePropertyBundle(propertyBundle) {
    let updatePropertyBundlePromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.updatePropertyBundle(), propertyBundle, this._requestOption.options)
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
    return updatePropertyBundlePromise;
  }

  createPropertyBundle(propertyBundle) {
    let createPropertyBundlePromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.createPropertyBundle(), propertyBundle, this._requestOption.options)
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
    return createPropertyBundlePromise;
  }

  destroyPropertyBundle(id) {
    let destroyPropertyBundlePromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.destroyPropertyBundle(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          this.onDestroyPropertyBundle.emit();
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return destroyPropertyBundlePromise;
  }

  getImageLocation(appWithPropertyBundles) {
    appWithPropertyBundles.propertyBundles.forEach(elem => {
      if (elem.icon) elem.icon = elem.icon.Location
    });
    return appWithPropertyBundles;
  }
}
