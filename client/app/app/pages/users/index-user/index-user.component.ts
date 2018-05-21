import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../resources/services/users.service";
import {DomSanitizer} from '@angular/platform-browser';
import {IndexUserEditButtonComponent} from './index-user.edit-button.component';
import {IndexUserDeleteButtonComponent} from './index-user.delete-button.component';
import {CellActiveComponent} from "../../../resources/components/table-cell/cell-active.component";
import {CellCreatedAtComponent} from "../../../resources/components/table-cell/cell-created-at.component";
import {LoaderService} from "../../../resources/services/loader.service";

@Component({
  selector: 'index-user',
  templateUrl: './index-user.component.html',
  providers: [LoaderService]

})
export class IndexUserComponent implements OnInit {
  data: any = {};
  test: boolean = true;
  messageTable: string = '';
  listOfRoles: any = [];
  settings = {
    actions: false,
    attr: {
      class: 'table mb-0'
    },
    filter: {
      inputClass: 'ng2-smart-filter-small'
    },
    columns: {


      name: {
        title: 'Name'
      },
      email: {
        title: 'Email'
      },
      role: {
        title: 'Role',
        filter: {
          type: 'list',
          config: {
            selectText: 'Role...',
            list: [],
          },
        },
      },
      active: {
        title: 'Active',
        type: 'custom',
        renderComponent: CellActiveComponent,
        renderComponentName: 'CellActiveComponent',
        filter: {
          type: 'checkbox',
          config: {
            true: 'true',
            false: 'false',
            resetText: '',
          },
        },
      },
      createdAt: {
        title: 'CreatedAt',
        type: 'custom',
        width: '150px',
        renderComponent: CellCreatedAtComponent,
        renderComponentName: 'CellCreatedAtComponent'
      },


      editUser: {
        title: 'Edit user',
        type: 'custom',
        filter: false,
        renderComponent: IndexUserEditButtonComponent,
        renderComponentName: 'IndexUserEditButtonComponent'
      },
      deleteUser: {
        title: 'Delete user',
        type: 'custom',
        filter: false,
        renderComponent: IndexUserDeleteButtonComponent,
        renderComponentName: 'IndexUserDeleteButtonComponent'
      }
    }
  };

  constructor(private _usersService: UsersService,
              private _sanitizer: DomSanitizer,
              public _loader: LoaderService,) {
    _usersService.onDestroyUser.subscribe(() => {
      this.getUsers();
    })
  }

  ngOnInit() {
    this.getUsers();
    this.getRoles();
  }

  getRoles() {
    this._usersService.getRoles()
      .then(
        (res: any) => {
          let listRoles = res.map((item) => {
            return {
              value: item.viewName,
              title: item.viewName
            }
          });
          this.settings['columns']['role']['filter']['config']['list'] = listRoles;
          this.listOfRoles = listRoles;
        },
        err => console.log(err)
      )
  }

  getUsers() {


    this._loader.show();
    this._usersService.getCollaborators()
      .then(
        res => {
          this.data = res;
          if (!this.data.length) this.messageTable = 'There is no data for display';
          this._loader.hide();
        },
        err => {
          this.data = err;
          this.messageTable = 'Sorry, but now the server can\'t display the data';
          this._loader.hide();
        }
      )
  }
}
