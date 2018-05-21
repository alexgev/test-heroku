import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {RequestOption} from '../../classes/request-options';
import {ToastrService} from 'ngx-toastr';
import {RootScope} from "../../classes/rootScope";

@Injectable()
export class StatusService {
  constructor(private _urlService: UrlService,
              private _http: HttpClient,
              public rootScope: RootScope,
              private _requestOption: RequestOption,
              private _toastr: ToastrService) {
  }

  asyncGetAllStatuses() {
    let asyncGetStatusesPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getStatuses(), null, this._requestOption.options)
        .toPromise()
        .then((res: any) => {
          if (res && res['error']) {
            return reject(res);
          }
          resolve(res);
        })
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return asyncGetStatusesPromise;
  }

  asyncGetStatuses() {
    let asyncGetMyStatusesPromise = new Promise((resolve, reject) => {
      this.asyncGetAllStatuses()
        .then((res: any) => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          let myStatuses = this.rootScope.currentCollaborator.statuses;
          let cloneStatuses = [...res];
          let myStatusesArray: any[] = [];
          cloneStatuses.forEach((status, index) => {
            if (myStatuses[status['name']])
              myStatusesArray.push(status);
          });
          resolve(myStatusesArray);
        })
        .catch((err => {
          reject(err)
        }))
    });
    return asyncGetMyStatusesPromise;
  }
}
