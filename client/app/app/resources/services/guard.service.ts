import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {RootScope} from "../../classes/rootScope";
import {AuthService} from "./auth.service";
import {PermissionsService} from "./permissions.service";

/**
 * Сервис доступа к странице только для зарегистрированных пользователей
 */
@Injectable()
export class AuthorizedUsers {
  firstInit: boolean = true;

  constructor(private _authSrevice: AuthService,
              private _router: Router,
              public rootScope: RootScope,
              private _permissionsService: PermissionsService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    let canActivatePromise = new Promise((resolve, reject) => {
      if (this.firstInit) {
        this.firstInit = false;
        this._authSrevice.asyncIsAuth()
          .then((res) => {
            this.callBackReq(route.data.componentName).then((res) => {
              resolve(res);
            })
          }, (err) => {


            this._router.navigate(['login']);
            resolve(true)
          });
      }
      else {
        this.callBackReq(route.data.componentName).then((res) => {
          resolve(res);
        })
      }
    });
    return canActivatePromise;
  }

  callBackReq(componentName: string) {
    return new Promise((resolve, reject) => {
      if (this.rootScope.auth) {
        if (this._permissionsService.haveRightToDisplayComponent(componentName)) {
          resolve(true);
        } else {

          resolve(false);
        }
      } else {
        this._router.navigate(['login']);
        resolve(false);
      }
    })
  }
}

/**
 * Сервис доступа к странице для всех пользователей
 */
@Injectable()
export class AllUsers {
  constructor(private _authSrevice: AuthService,
              private _router: Router,
              public rootScope: RootScope) {
  }

  canActivate() {
    let canActivatePromise = new Promise((resolve, reject) => {
      this._authSrevice.asyncIsAuth()
        .then((res) => {
          if (this.rootScope.auth) {
            resolve(true);
          } else {
            resolve(true);
          }
        }, (err) => {
          resolve(true);
        })
    });
    return canActivatePromise;
  }
}

@Injectable()
export class NonAuthorizedUsers {
  constructor(private _authSrevice: AuthService,
              private _router: Router,
              public rootScope: RootScope) {
  }

  canActivate() {
    let canActivatePromise = new Promise((resolve, reject) => {
      this._authSrevice.asyncIsAuth()
        .then((res) => {
          if (this.rootScope.auth) {
            this._router.navigate(['apps']);
            resolve(true);
          } else {
            resolve(true);
          }
        }, (err) => {
          resolve(true);
        })
    });
    return canActivatePromise;
  }
}
