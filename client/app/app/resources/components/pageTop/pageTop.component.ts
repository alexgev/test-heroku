import {Component} from '@angular/core';
import {RootScope} from "../../../classes/rootScope";
import {Collaborator} from "../../../classes/collaborator";
import {AuthService} from "../../services/auth.service";
import {TopProfileComponent} from "../topProfile/topProfile.component";

@Component({
  selector: 'page-top',
  providers: [
    TopProfileComponent,
  ],
  templateUrl: './pageTop.component.html',
})
export class PageTopComponent {
  /**
   * Текущий коллаборатор: получаем с сервера. Если данных нет - создаём пустого коллаборатора
   */
  currentCollaborator: any = this.rootScope.currentCollaborator || new Collaborator();
  public auth: boolean = this.rootScope.auth || false;

  constructor(public rootScope: RootScope,
              private _topProfile: TopProfileComponent,
              private _authService: AuthService) {
    this._authService.onCheckAuthorization.subscribe({
      next: (auth: boolean) => {
        this.currentCollaborator = this.rootScope.currentCollaborator;
        this.auth = auth;
      }
    })
  }
}
