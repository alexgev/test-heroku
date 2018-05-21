import {EventEmitter, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {RequestOption} from "../../classes/request-options";
import {UrlService} from "./url.service";

@Injectable()
export class UsersService {
  public onUsersLoaded: EventEmitter<boolean> = new EventEmitter(true);
  public onDisableUser: EventEmitter<boolean> = new EventEmitter(true);
  public onDestroyUser: EventEmitter<boolean> = new EventEmitter(true);

  constructor(private _http: HttpClient,
              private _urlService: UrlService,
              private _toastr: ToastrService,
              private _router: Router,
              private _requestOption: RequestOption) {
  }

  asyncGetUsers(limit: string = '', skip: string = '') {
    let body = {
      limit: limit,
      skip: skip
    }
    let asyncGetUsersPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getUsers(), body, this._requestOption.options)
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
    return asyncGetUsersPromise;
  }

  createUser(user) {
    let asyncCreateUserPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.createUser(), user, this._requestOption.options)
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
    return asyncCreateUserPromise;
  }

  updateMe(user) {
    let asyncUpdateMe = new Promise((resolve, reject) => {
      this._http.post(this._urlService.updateMe(), user, this._requestOption.options)
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
    return asyncUpdateMe
  }

  getUserById(id) {
    let asyncGetUserByIdPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getUserById(), {id: id}, this._requestOption.options)
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
    return asyncGetUserByIdPromise;
  }

  updateUser(user) {
    let asyncUpdateUserPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.updateUser(), user, this._requestOption.options)
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
    return asyncUpdateUserPromise;
  }

  disableUser(id) {
    let asyncDeleteUserPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.disableUser(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          this.onDisableUser.emit();
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return asyncDeleteUserPromise;
  }

  destroyUser(id) {
    let destroyUserPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.destroyUser(), {id: id}, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          this.onDestroyUser.emit();
          resolve(res);
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return destroyUserPromise;
  }

  getRoles() {
    let asyncGetRolesPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getRoles(), this._requestOption.options)
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
    return asyncGetRolesPromise;
  }

  getCollaborators() {
    let getCollaboratorsPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getCollaborators(), null, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            this._toastr.error(res['error'].description, 'Error');
            return reject(res);
          }
          resolve(this.getUsersFromCollaborators(res));
        }))
        .catch((err => {
          console.error(err);
          this._toastr.error('Something went wrong :(', 'Error');
          reject(err)
        }))
    });
    return getCollaboratorsPromise;
  }

  getCollaboratorById(id?) {
    let getCollaboratorByIdPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getCollaboratorById(), {id: id}, this._requestOption.options)
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
    return getCollaboratorByIdPromise;
  }

  updateCollaborator(collaborator) {
    let updateCollaboratorPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.updateCollaborator(), collaborator, this._requestOption.options)
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
    return updateCollaboratorPromise;
  }

  getUsersFromCollaborators(collaborators) {
    var users = [];
    collaborators.forEach(collaborator => {
      var tmp = collaborator.user;
      tmp.role = collaborator.role.viewName;
      tmp.id = collaborator.id;
      users.push(tmp);
    });
    return users;
  }

  ping() {
    return new Promise((resolve, reject) => {
      this._http.post(this._urlService.pullSocket(), null, this._requestOption.options)
        .toPromise()
        .then((res) => {
          resolve(res);
        }, (err) => {
          reject(err)
        })
    });
  }
}
