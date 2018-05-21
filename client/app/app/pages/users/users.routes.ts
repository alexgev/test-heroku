import {AuthorizedUsers} from "../../resources/services/guard.service";
import {IndexUserComponent} from "./index-user/index-user.component";
import {Routes} from "@angular/router";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {CreateUserComponent} from "./create-user/create-user.component";

export const UsersRoutes: Routes = [
  {
    path: '',
    component: IndexUserComponent,
    data: {
      title: 'List of Users',
      componentName: 'IndexUserComponent',
    },
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'create',
    data: {
      title: 'Create User',
      componentName: 'CreateUserComponent',
    },
    component: CreateUserComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'edit/:userId',
    data: {
      title: 'Edit User',
      componentName: 'EditUserComponent',
    },
    component: EditUserComponent,
    canActivate: [AuthorizedUsers]
  }
];
