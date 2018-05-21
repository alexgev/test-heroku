import {EventEmitter, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {RequestOption} from "../../classes/request-options";
import {UrlService} from "./url.service";

@Injectable()
export class ApplicationsService {
  public onDisableApplication: EventEmitter<boolean> = new EventEmitter(true);
  public onDestroyApplication: EventEmitter<boolean> = new EventEmitter(true);

  constructor(private _http: HttpClient,
              private _urlService: UrlService,
              private _toastr: ToastrService,
              private _router: Router,
              private _requestOption: RequestOption) {
  }

  asyncGetApplications(limit: string = '', skip: string = '') {
    let body = {
      limit: limit,
      skip: skip
    }
    let asyncGetApplicationsPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getApplications(), body, this._requestOption.options)
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
    return asyncGetApplicationsPromise;
  }

  disableApplication(id) {
    let asyncDisableApplicationPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.disableApplication(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          this.onDisableApplication.emit();
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return asyncDisableApplicationPromise;
  }

  getApplicationById(id) {
    let getApplicationByIdPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getApplicationById(), {id: id}, this._requestOption.options)
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
    return getApplicationByIdPromise;
  }

  updateApplication(application) {
    let updateUserPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.updateApplication(), application, this._requestOption.options)
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
    return updateUserPromise;
  }

  createApplication(application) {
    let createApplicationPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.createApplication(), application, this._requestOption.options)
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
    return createApplicationPromise;
  }

  destroyApplication(id) {
    let destroyApplicationPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.destroyApplication(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          this.onDestroyApplication.emit();
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return destroyApplicationPromise;
  }
}
