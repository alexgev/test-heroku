import {Routes} from "@angular/router";
import {LoginComponent} from "../pages/auth/login/login.component";
import {AllUsers, AuthorizedUsers, NonAuthorizedUsers} from "../resources/services/guard.service";
import {UsersRoutes} from "../pages/users/users.routes";
import {ApplicationsRoutes} from "../pages/applications/applications.routes";
import {UsersComponent} from "../pages/users/users.component";
import {ApplicationsComponent} from "../pages/applications/applications.component";
import {PageNotFoundComponent} from "../pages/static/page-not-found/page-not-found.component";
import {ProfileComponent} from "../pages/profile/profile.component";

export const appRoutes: Routes = [


  {
    path: '',
    redirectTo: '/apps',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      componentName: 'LoginComponent',
    },
    canActivate: [NonAuthorizedUsers]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      componentName: 'ProfileComponent',
      hidden: true,
      name: 'My Profile'
    },
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'users',
    data: {
      title: 'Users',
      icon: 'fas fa-users',
      index: 20,
      componentName: 'UsersComponent',
    },
    children: UsersRoutes,
    component: UsersComponent,
    canActivate: [AuthorizedUsers]
  },
  {
    path: 'apps',
    data: {
      title: 'Apps',
      icon: 'fas fa-home',
      index: 10,
      componentName: 'ApplicationsComponent',
    },
    component: ApplicationsComponent,
    children: ApplicationsRoutes,

    canActivate: [AuthorizedUsers]
  },
  {
    path: "**",
    component: PageNotFoundComponent,
    data: {
      title: 'Not Found',
      hide: true,
      componentName: 'PageNotFoundComponent',
    },
    canActivate: [AllUsers]
  },
];
