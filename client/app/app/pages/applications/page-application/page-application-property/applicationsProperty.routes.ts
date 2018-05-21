import {AuthorizedUsers} from "../../../../resources/services/guard.service";
import {Routes} from "@angular/router";
import {EditPageApplicationPropertyComponent} from "./edit-page-application-property/edit-page-application-property.component";
import {PagePageApplicationsPropertyRoutes} from "./page-page-application-property/pagePageApplicationsProperty.routes";
import {IndexPageApplicationPropertyComponent} from "./index-page-application-property/index-page-application-property.component";
import {CreatePageApplicationPropertyComponent} from "./create-page-application-property/create-page-application-property.component";
import {PagePageApplicationPropertyComponent} from "./page-page-application-property/page-page-application-property.component";

export const ApplicationsPropertyRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'List of Properties Bundles',
      componentName: 'IndexPageApplicationPropertyComponent',
    },
    component: IndexPageApplicationPropertyComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'create',
    data: {
      title: 'Create Properties Bundle',
      componentName: 'CreatePageApplicationPropertyComponent',
    },
    component: CreatePageApplicationPropertyComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'edit/:propertyId',
    data: {
      title: 'Edit Properties Bundle',
      componentName: 'EditPageApplicationPropertyComponent',
    },
    component: EditPageApplicationPropertyComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'page/:propertyId',
    data: {
      title: 'Page Properties Bundle',
      varName: 'propertiesName',
      componentName: 'PagePageApplicationPropertyComponent',
    },
    children: PagePageApplicationsPropertyRoutes,
    component: PagePageApplicationPropertyComponent,
    canActivate: [AuthorizedUsers]
  }
];
