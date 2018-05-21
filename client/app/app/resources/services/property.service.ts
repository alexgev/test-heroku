import {EventEmitter, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {RequestOption} from "../../classes/request-options";
import {UrlService} from "./url.service";

@Injectable()
export class PropertyService {
  public onDisableProperty: EventEmitter<boolean> = new EventEmitter(true);
  public onDestroyProperty: EventEmitter<boolean> = new EventEmitter(true);

  constructor(private _http: HttpClient,
              private _urlService: UrlService,
              private _toastr: ToastrService,
              private _router: Router,
              private _requestOption: RequestOption) {
  }

  asyncGetProperties(id) {
    let asyncGetPropertiesPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getProperties(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          resolve(this.getStatusName(res));
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return asyncGetPropertiesPromise;
  }

  disableProperty(id) {
    let disablePropertyPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.disableProperty(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          this.onDisableProperty.emit();
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return disablePropertyPromise;
  }

  getPropertyById(id) {
    let getPropertyByIdPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getPropertyById(), {id: id}, this._requestOption.options)
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
    return getPropertyByIdPromise;
  }

  updateProperty(contentUnit) {
    let updatePropertyPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.updateProperty(), contentUnit, this._requestOption.options)
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
    return updatePropertyPromise;
  }

  createProperty(contentUnit) {
    let createPropertyPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.createProperty(), contentUnit, this._requestOption.options)
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
    return createPropertyPromise;
  }

  getStatusName(res) {
    res.properties.forEach(elem => {
      elem.status = elem.status.name;
    });
    return res;
  }

  destroyProperty(id) {
    let destroyPropertyPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.destroyProperty(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          this.onDestroyProperty.emit();
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return destroyPropertyPromise;
  }
}
