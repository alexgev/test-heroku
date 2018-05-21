import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule} from 'ngx-dropzone-wrapper';
import {ThemeDirective} from "../directives/theme.directive";
import {SmallBlocksModule} from "./smallBlocks/small-blocks.module";
import {LogoComponent} from "./logo/logo.component";
import {NotificationComponent} from "./notification/notification.component";
import {PageTopComponent} from "./pageTop/pageTop.component";
import {PreloaderComponent} from "./preloader/preloader.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {SidebarFooterComponent} from "./sidebarFooter/sidebarFooter.component";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {TopProfileComponent} from "./topProfile/topProfile.component";
import {CellUpdatedAtComponent} from "./table-cell/cell-updated-at.component";
import {CellCreatedAtComponent} from "./table-cell/cell-created-at.component";
import {CellActiveComponent} from "./table-cell/cell-active.component";
import {ValidateDirective} from "../directives/validate.directive";
import {MyDropzoneComponent} from './dropzone/dropzone.component';
import {SystemMessageComponent} from './system-message/system-message.component';
import {CellDataComponent} from "./table-cell/cell-data.component";
import {SocketComponent} from './socket/socket.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {

  maxFilesize: 50,
  acceptedFiles: 'image/*',
  withCredentials: true
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    SmallBlocksModule,
    DropzoneModule
  ],
  declarations: [
    ThemeDirective,

    LogoComponent,
    NotificationComponent,
    PageTopComponent,
    PreloaderComponent,

    SidebarComponent,
    BreadcrumbComponent,
    SidebarFooterComponent,
    TopProfileComponent,
    CellUpdatedAtComponent,
    CellCreatedAtComponent,
    CellActiveComponent,
    CellDataComponent,

    MyDropzoneComponent,
    SocketComponent,
    ValidateDirective,
    SystemMessageComponent
  ],
  exports: [
    RouterModule,
    NgbModule,
    ThemeDirective,
    ValidateDirective,

    LogoComponent,
    NotificationComponent,
    PageTopComponent,
    PreloaderComponent,

    SidebarComponent,
    BreadcrumbComponent,
    SidebarFooterComponent,
    TopProfileComponent,
    SmallBlocksModule,
    CellUpdatedAtComponent,
    CellCreatedAtComponent,
    CellActiveComponent,
    CellDataComponent,

    MyDropzoneComponent,
    SystemMessageComponent,
    SocketComponent
  ],
  entryComponents: [
    CellCreatedAtComponent,
    CellUpdatedAtComponent,
    CellActiveComponent,
    CellDataComponent
  ],
  providers: [

    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class ComponentsModule {
}
