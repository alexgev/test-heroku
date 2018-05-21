import {AuthorizedUsers} from "../../../../../resources/services/guard.service";
import {CreatePagePageApplicationContentComponent} from "./create-page-page-application-content/create-page-page-application-content.component";
import {EditPagePageApplicationContentComponent} from "./edit-page-page-application-content/edit-page-page-application-content.component";
import {Routes} from "@angular/router";
import {IndexPagePageApplicationContentComponent} from "./index-page-page-application-content/index-page-page-application-content.component";

export const PagePageApplicationsContentRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: {
      title: 'List Of Content Unit',
      componentName: 'IndexPagePageApplicationContentComponent',
    },
    component: IndexPagePageApplicationContentComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'create',
    data: {
      title: 'Create Content Unit',
      componentName: 'CreatePagePageApplicationContentComponent',
    },
    component: CreatePagePageApplicationContentComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'edit/:unitId',
    data: {
      title: 'Edit Content Unit',
      componentName: 'EditPagePageApplicationContentComponent',
    },
    component: EditPagePageApplicationContentComponent,
    canActivate: [AuthorizedUsers]
  }
]
