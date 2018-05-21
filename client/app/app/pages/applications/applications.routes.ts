import {AuthorizedUsers} from "../../resources/services/guard.service";
import {CreateApplicationComponent} from "./create-application/create-application.component";
import {IndexApplicationComponent} from "./index-application/index-application.component";
import {EditApplicationComponent} from "./edit-application/edit-application.component";
import {PageApplicationComponent} from "./page-application/page-application.component";
import {Routes} from "@angular/router";
import {ApplicationsPagesRoutes} from "./page-application/applicationsPages.routes";

export const ApplicationsRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'List of Apps',
      componentName: 'IndexApplicationComponent',
    },
    component: IndexApplicationComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'create',
    data: {
      title: 'Create App',
      componentName: 'CreateApplicationComponent',
    },
    component: CreateApplicationComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'edit/:appId',
    data: {
      title: 'Edit App',
      componentName: 'EditApplicationComponent',
    },
    component: EditApplicationComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'page/:appId',
    data: {
      title: 'App',
      varName: 'appName',
      componentName: 'PageApplicationComponent',
    },
    children: ApplicationsPagesRoutes,
    component: PageApplicationComponent,
    canActivate: [AuthorizedUsers]
  }
];
