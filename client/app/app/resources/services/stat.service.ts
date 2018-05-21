import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {RequestOption} from "../../classes/request-options";

@Injectable()
export class StatService {
  constructor(private _urlService: UrlService,
              private _http: HttpClient,
              private _requestOption: RequestOption) {
  }

  asyncGetActive(appId) {
    let asyncGetActive = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getActiveCount(), {appId: appId}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            return reject(res);
          }
          resolve(res);
        }))
        .catch((err => {
          reject(err);
          return err;
        }))
    });
    return asyncGetActive;
  }

  asyncRequestCount(appId, dates?) {
    let body = {appId: appId};
    if (dates) body = Object.assign(body, dates);
    let asyncGetRequestCount = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getBundleRequestCount(), body, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            return reject(res);
          }
          resolve(res);
        }))
        .catch((err => {
          reject(err);
          return err;
        }))
    });
    return asyncGetRequestCount;
  }
}
