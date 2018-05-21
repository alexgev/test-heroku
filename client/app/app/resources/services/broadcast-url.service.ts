import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Broadcaster} from '../../classes/broadcaster';

@Injectable()
export class BroadcastUrlService {
  public params: any = {};
  public appName: string;
  public propertiesName: string;
  public contentName: string;

  constructor(private _toastr: ToastrService,
              private _broadcaster: Broadcaster) {
  }

  setUrl(params) {
    for (let key in params) {
      this.params[key] = params[key];
    }
  }

  getUrl() {
    return this.params;
  }

  setAppName(appName) {
    this.appName = appName;
    this._broadcaster.broadcast('setName');
  }

  setPropertiesName(propertiesName) {
    this.propertiesName = propertiesName;
    this._broadcaster.broadcast('setName');
  }

  setContentName(contentName) {
    this.contentName = contentName;
    this._broadcaster.broadcast('setName');
  }

  getName(varName: string) {
    return this[varName];
  }
}

