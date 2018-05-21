import {AuthorizedUsers} from "../../../../resources/services/guard.service";
import {CreatePageApplicationContentComponent} from "./create-page-application-content/create-page-application-content.component";
import {PagePageApplicationContentComponent} from "./page-page-application-content/page-page-application-content.component";
import {IndexPageApplicationContentComponent} from "./index-page-application-content/index-page-application-content.component";
import {PagePageApplicationsContentRoutes} from "./page-page-application-content/pagePageApplicationsContent.routes";
import {Routes} from "@angular/router";
import {EditPageApplicationContentComponent} from "./edit-page-application-content/edit-page-application-content.component";

export const ApplicationsContentRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'List Of Content Bundles',
      componentName: 'IndexPageApplicationContentComponent',
    },
    component: IndexPageApplicationContentComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'create',
    data: {
      title: 'Create Content Bundle',
      componentName: 'CreatePageApplicationContentComponent',
    },
    component: CreatePageApplicationContentComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'edit/:contentId',
    data: {
      title: 'Edit Content Bundle',
      componentName: 'EditPageApplicationContentComponent',
    },
    component: EditPageApplicationContentComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'page/:contentId',
    data: {
      title: 'Page Content Bundle',
      varName: 'contentName',
      componentName: 'PagePageApplicationContentComponent',
    },
    children: PagePageApplicationsContentRoutes,
    component: PagePageApplicationContentComponent, canActivate: [AuthorizedUsers]
  }
];
