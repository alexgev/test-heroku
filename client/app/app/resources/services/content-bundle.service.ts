import {EventEmitter, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {RequestOption} from "../../classes/request-options";
import {UrlService} from "./url.service";

@Injectable()
export class ContentBundleService {
  public onDisableContentBundle: EventEmitter<boolean> = new EventEmitter(true);
  public onDestroyContentBundle: EventEmitter<boolean> = new EventEmitter(true);

  constructor(private _http: HttpClient,
              private _urlService: UrlService,
              private _toastr: ToastrService,
              private _router: Router,
              private _requestOption: RequestOption) {
  }

  asyncGetContentBundles(id) {
    let asyncGetContentBundlesPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getContentBundles(), {id: id}, this._requestOption.options)
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
    return asyncGetContentBundlesPromise;
  }

  disableContentBundle(id) {
    let disableContentBundlePromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.disableContentBundle(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          this.onDisableContentBundle.emit();
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return disableContentBundlePromise;
  }

  getContentBundleById(id) {
    let getContentBundleByIdPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getContentBundleById(), {id: id}, this._requestOption.options)
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
    return getContentBundleByIdPromise;
  }

  updateContentBundle(contentBundle) {
    let updateContentBundlePromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.updateContentBundle(), contentBundle, this._requestOption.options)
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
    return updateContentBundlePromise;
  }

  createContentBundle(contentBundle) {
    let createContentBundlePromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.createContentBundle(), contentBundle, this._requestOption.options)
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
    return createContentBundlePromise;
  }

  destroyContentBundle(id) {
    let destroyContentBundlePromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.destroyContentBundle(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          this.onDestroyContentBundle.emit();
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return destroyContentBundlePromise;
  }

  getImageLocation(appWithContentBundles) {
    appWithContentBundles.contentBundles.forEach(elem => {
      if (elem.icon) elem.icon = elem.icon.Location
    });
    return appWithContentBundles;
  }
}
