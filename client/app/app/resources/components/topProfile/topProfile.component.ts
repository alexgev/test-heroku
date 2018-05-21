import {Component} from '@angular/core';
import {RootScope} from "../../../classes/rootScope";
import {Broadcaster} from "../../../classes/broadcaster";
import {AuthService} from "../../services/auth.service";
import {CollaboratorService} from "../../services/collaborator.service";

@Component({
  selector: 'top-profile',
  templateUrl: './topProfile.component.html'
})
export class TopProfileComponent {
  collaborators: any;
  currentCollaborator: any = this.rootScope.currentCollaborator;
  collaboratorsChangeVisible: boolean = false;

  constructor(public rootScope: RootScope,
              public broadcaster: Broadcaster,
              private _authService: AuthService,
              private _collaboratorService: CollaboratorService) {
    let self = this;
    /**
     * Вывод списка коллабораторов после аутентификации
     */
    this._collaboratorService.myCollaborators();
    this.broadcaster.on('checkedAuth').subscribe(function () {
      self.collaborators = self.rootScope.collaborators;
      self.collaboratorsChangeVisible = (self.collaborators.length > 1);
    });
  }

  logOut($event) {
    $event.preventDefault();
    this._authService.logOut();
  };

  changeThisCollaborator(collaborator) {
    this._collaboratorService.changeCollaborator(collaborator).then(res => {
        this.currentCollaborator = this.rootScope.currentCollaborator.organization.name;
      },
      err => {
        console.log(err)
      })
  }
}
