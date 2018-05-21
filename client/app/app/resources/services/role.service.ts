import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";

@Injectable()
export class RoleService {
  constructor(private _urlService: UrlService,
              private _http: HttpClient) {
  }

  asyncGetRoles() {
    let asyncGetRolesPromise = new Promise((resolve, reject) => {
      this._http.request('POST', this._urlService.logOut())
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
    return asyncGetRolesPromise;
  }
}
