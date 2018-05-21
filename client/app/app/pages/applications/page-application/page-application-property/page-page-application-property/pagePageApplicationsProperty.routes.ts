import {AuthorizedUsers} from "../../../../../resources/services/guard.service";
import {IndexPagePageApplicationPropertyComponent} from "./index-page-page-application-property/index-page-page-application-property.component";
import {Routes} from "@angular/router";
import {CreatePagePageApplicationPropertyComponent} from "./create-page-page-application-property/create-page-page-application-property.component";
import {EditPagePageApplicationPropertyComponent} from "./edit-page-page-application-property/edit-page-page-application-property.component";

export const PagePageApplicationsPropertyRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'List Of Properties',
      componentName: 'IndexPagePageApplicationPropertyComponent',
    },
    component: IndexPagePageApplicationPropertyComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'create',
    data: {
      title: 'Create Property',
      componentName: 'CreatePagePageApplicationPropertyComponent',
    },
    component: CreatePagePageApplicationPropertyComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'edit/:propId',
    data: {
      title: 'Edit Property',
      componentName: 'EditPagePageApplicationPropertyComponent',
    },
    component: EditPagePageApplicationPropertyComponent,
    canActivate: [AuthorizedUsers]
  }
];
