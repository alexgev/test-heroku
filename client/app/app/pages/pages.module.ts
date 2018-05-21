import {NgModule} from "@angular/core";
import {CommonModule, Location} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, ExtraOptions} from "@angular/router";
import {MalihuScrollbarModule} from "ngx-malihu-scrollbar/dist/lib";
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule, NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import {DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule} from 'ngx-dropzone-wrapper';
import {appRoutes} from "../classes/appRoutes";
import {ParentRoutes} from "../classes/parentRoutes";
import {ComponentsModule} from "../resources/components/components.module";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from './users/users.module';
import {ApplicationsModule} from "./applications/applications.module";
import {StaticModule} from "./static/static.module";
import {ProfileComponent} from './profile/profile.component';
import {ResourcesModule} from "../resources/resources.module";

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {


  maxFilesize: 50,
  acceptedFiles: 'image/*'
};
const trailingSlash = /\/$|\/(?=\?)|\/(?=#)/g;
Location.stripTrailingSlash = (url: string) => url.replace(trailingSlash, '');

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  useHash: true
};

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    NgSelectModule,
    MalihuScrollbarModule.forRoot(),
    NgbModule,
    AuthModule,
    ApplicationsModule,
    UsersModule,
    ComponentsModule,
    StaticModule,
    DropzoneModule,
    ResourcesModule,
    RouterModule.forRoot(
      appRoutes, routingConfiguration
    ),
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    NgbPaginationConfig,
    ParentRoutes,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  exports: []
})
export class PagesModule {
}
