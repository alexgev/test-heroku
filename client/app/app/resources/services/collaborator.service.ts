import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RootScope} from "../../classes/rootScope";
import {Broadcaster} from "../../classes/broadcaster";
import {RequestOption} from "../../classes/request-options";
import {UrlService} from "./url.service";

@Injectable()
export class CollaboratorService {
  constructor(private _urlService: UrlService,
              private _http: HttpClient,
              public rootScope: RootScope,
              public broadcaster: Broadcaster,
              private _requestOption: RequestOption) {
  }

  /**
   * Получение списка коллабораторов текущего пользователя
   */
  myCollaborators() {
    let myCollaboratorsPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.getMyCollaborators(), null, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            return reject(res);
          }
          resolve(res);
          this.rootScope.collaborators = res;
          this.broadcaster.broadcast('checkedAuth', this.rootScope.auth);
        }))
        .catch((err => {
          reject(err)
        }))
    });
    return myCollaboratorsPromise;
  }

  /**
   * Функция выбора коллаборатора
   */
  changeCollaborator(collaborator: any) {
    let body = {
      organization: collaborator.organization,
      user: collaborator.user,
      role: collaborator.role,
      id: collaborator.id
    }
    let changeCollaboratorPromise = new Promise((resolve, reject) => {
      this._http.post(this._urlService.setCollaborators(), body, this._requestOption.options)
        .toPromise()
        .then((res => {
          if (res && res['error']) {
            return reject(res);
          }
          this.rootScope.currentCollaborator = res;
          location.reload();
          setTimeout(() => {
            resolve(res);
          }, 30000);
        }))
        .catch((err => {
          reject(err);
        }))
    });
    return changeCollaboratorPromise;
  }

  /**
   * Функция получения коллаборатора по ID организации (НЕ ИСПОЛЬЗУЕТСЯ!!!)
   */
  getCollaboratorsByOrganization(organization: any) {
    let body = {
      id: organization
    }
    let getCollaboratorsByOrganizationPromise = new Promise((resolve, reject) => {


    });
    return getCollaboratorsByOrganizationPromise;
  }
}
