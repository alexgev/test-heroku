import {Injectable} from '@angular/core';
import {Broadcaster} from "../../classes/broadcaster";
import {RootScope} from "../../classes/rootScope";

@Injectable()
export class PermissionsService {
  public permissionsForComponents: any = {}

  constructor(private _broadcaster: Broadcaster,
              public rootScope: RootScope) {
    let self = this;
    this._broadcaster.on('onUserPermissionsLoad').subscribe(function (userAccessesResult) {
      self.permissionsForComponents = userAccessesResult;
    })
  }

  haveRightToDisplayComponent(currentElementComponentName, configurationObjects?) {
    if (configurationObjects && this.rootScope.currentCollaborator) {
      let statuses = this.rootScope.currentCollaborator.statuses;
      if (statuses[configurationObjects['status']]) {
        return true
      }
      return false
    }
    return !!this.permissionsForComponents[currentElementComponentName];
  }

  filterColumns(columns: any) {
    for (let column in columns) {
      if (columns[column].hasOwnProperty('renderComponentName')) {
        if (!this.haveRightToDisplayComponent(columns[column]['renderComponentName'])) {
          delete columns[column];
        }
      }
    }
    return columns
  }
}
