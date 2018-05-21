import {Injectable} from '@angular/core';
import {RootScope} from "../../classes/rootScope";

@Injectable()
export class PoliceService {
  constructor(private _rootScope: RootScope) {
  }

  accessRouteAvaliable(item) {
    return !!(item && this._rootScope.access && this._rootScope.access[item]);
  }
}
