import {AuthorizedUsers} from "../../../resources/services/guard.service";
import {PageApplicationIndexComponent} from "./page-application-index/page-application-index.component";
import {Routes} from "@angular/router";
import {
  PageApplicationContentComponent
} from "./page-application-content/page-application-content.component";
import {ApplicationsPropertyRoutes} from "./page-application-property/applicationsProperty.routes";
import {ApplicationsContentRoutes} from "./page-application-content/applicationsContent.routes";
import {PageApplicationPropertyComponent} from "./page-application-property/page-application-property.component";

export const ApplicationsPagesRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'App Name',
      componentName: 'PageApplicationIndexComponent',
    },
    component: PageApplicationIndexComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'content',
    data: {
      title: 'Content Bundles',
      componentName: 'PageApplicationContentComponent',
    },
    children: ApplicationsContentRoutes,
    component: PageApplicationContentComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'property',
    data: {
      title: 'Properties Bundles',
      componentName: 'PageApplicationPropertyComponent',
    },
    children: ApplicationsPropertyRoutes,
    component: PageApplicationPropertyComponent,
    canActivate: [AuthorizedUsers]
  }
];
