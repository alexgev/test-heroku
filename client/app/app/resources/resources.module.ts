import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ComponentsModule} from "./components/components.module";
import {AuthService} from "./services/auth.service";
import {UrlService} from "./services/url.service";
import {CollaboratorService} from "./services/collaborator.service";
import {AllUsers, AuthorizedUsers, NonAuthorizedUsers} from "./services/guard.service";
import {RequestOption} from "../classes/request-options";
import {HandlerService} from "./services/handler.service";
import {UsersService} from './services/users.service';
import {ApplicationsService} from "./services/applications.service";
import {ContentBundleService} from "./services/content-bundle.service";
import {PropertyBundleService} from "./services/property-bundle.service";
import {ContentUnitService} from './services/content-unit.service';
import {PropertyService} from "./services/property.service";
import {StatusService} from "./services/status.service";
import {PermissionsService} from "./services/permissions.service";
import {StatService} from "./services/stat.service";
import {BroadcastUrlService} from "./services/broadcast-url.service";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    ComponentsModule
  ],
  providers: [
    AuthService,
    UrlService,
    ToastrService,
    CollaboratorService,
    AuthorizedUsers,
    NonAuthorizedUsers,
    UsersService,
    ContentBundleService,
    PropertyBundleService,
    AllUsers,
    ApplicationsService,
    ContentUnitService,
    PropertyService,
    StatusService,
    RequestOption,
    HandlerService,
    PermissionsService,
    StatService,
    BroadcastUrlService,
  ],
  declarations: []
})
export class ResourcesModule {
}
