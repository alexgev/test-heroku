import {EventEmitter, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Broadcaster} from "../../classes/broadcaster";
import {RootScope} from "../../classes/rootScope";
import {Collaborator} from "../../classes/collaborator";
import {RequestOption} from "../../classes/request-options";
import {UrlService} from "./url.service";
import {CollaboratorService} from "./collaborator.service";

@Injectable()
export class AuthService {
  public onCheckAuthorization: EventEmitter<boolean> = new EventEmitter(true);
  public onTerminalsSelected: EventEmitter<boolean> = new EventEmitter(true);
  public onTagsLoaded: EventEmitter<boolean> = new EventEmitter(true);

  constructor(private _http: HttpClient,
              private _urlService: UrlService,
              public rootScope: RootScope,
              public broadcaster: Broadcaster,
              private _toastr: ToastrService,
              private _router: Router,
              private _collaboratorService: CollaboratorService,
              public collaborator: Collaborator,
              private _requestOption: RequestOption) {
  }

  asyncSignUp(valid: boolean, user: any) {
    let body = {
      email: user.email,
      password: user.password
    }
    let asyncSignUpPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.userSignUp(), body, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          if (user.password == user.confirmPassword) {
            this._toastr.success('Проверьте ваш email', 'Спасибо');
            this._router.navigate(['login']);
            resolve(res);
          } else {
            this._toastr.warning('Введённые пароли не совпадают', 'Внимание');
            reject(res);
          }
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return asyncSignUpPromise;
  }

  logIn(email: string, password: string) {
    let body = {
      email: email,
      password: password
    }
    let logInPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.userLogin(), body, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          this.rootScope.auth = res;
          this.rootScope.currentUser = true;
          this.rootScope.userName = this.rootScope.auth.userName;
          this.asyncIsAuth().then(() => {
              this.broadcaster.broadcast('checkedAuth', this.rootScope.auth);
              this._router.navigate(['apps']);
              resolve(res);
            },
            (err) => {
              reject(err)
            });
        }))
        .catch((err => {
          this.rootScope.auth = false;
          this._toastr.error(err.error.description, 'Ошибка');
          this.broadcaster.broadcast('checkedAuth', this.rootScope.auth);
          reject(err)
        }))
    });
    return logInPromise;
  }

  asyncIsAuth() {
    let asyncIsAuthPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.isAuth(), null, this._requestOption.options)
        .toPromise()
        .then((res => {
          this.rootScope.auth = !!(res);
          /**
           * Установка текущего коллаборатора или создание пустого шаблона
           */
          if (this.rootScope.auth) {
            this.rootScope.isAuth = true;
            this.rootScope.currentCollaborator = res;
          } else {
            this.rootScope.currentCollaborator = new Collaborator()
          }
          /**
           * Получение списка коллабораторов, групп и терминалов
           */
          let permissions = res['permissions'] || {};
          this.broadcaster.broadcast('onUserPermissionsLoad', permissions);
          this.onCheckAuthorization.emit(this.rootScope.auth);
          resolve(res);
        }))
        .catch((err => {
          this.rootScope.auth = false;
          this.onCheckAuthorization.emit(this.rootScope.auth);
          reject(err)
        }))
    });
    return asyncIsAuthPromise;
  }

  logOut() {
    let logOutPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.logOut(), null, this._requestOption.options)
        .toPromise()
        .then((res) => {
          this.asyncIsAuth().then((res) => {
              this._router.navigate(['login']);
              resolve(res);
            },
            (err) => {
              this._router.navigate(['login']);
              reject(err)
            });
        }, (err) => {
          reject(err)
        })
    });
    return logOutPromise;
  }

  restore(valid: boolean, email: string) {
    let body = {
      email: email
    }
    let restorePromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.userPassRestore(), body, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          resolve(res);
          return true;
        }))
        .catch((err => {
          reject(err);
          return false;
        }))
    });
    return restorePromise;
  }
}
