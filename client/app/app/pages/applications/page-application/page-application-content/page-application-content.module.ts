import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexPageApplicationContentComponent} from './index-page-application-content/index-page-application-content.component';
import {EditPageApplicationContentComponent} from './edit-page-application-content/edit-page-application-content.component';
import {CreatePageApplicationContentComponent} from './create-page-application-content/create-page-application-content.component';
import {PageApplicationContentComponent} from './page-application-content.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {IndexPageApplicationContentDeleteButtonComponent} from './index-page-application-content/buttons/index-page-application-content.delete-button.component';
import {IndexPageApplicationContentEditButtonComponent} from './index-page-application-content/buttons/index-page-application-content.edit-button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IndexPageApplicationContentButtonComponent} from "./index-page-application-content/buttons/index-page-application-content.page-button.component";
import {PagePageApplicationContentModule} from "./page-page-application-content/page-page-application-content.module";
import {ResourcesModule} from '../../../../resources/resources.module';
import {SystemMessageComponent} from "../../../../resources/components/system-message/system-message.component";

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    PagePageApplicationContentModule,
    ResourcesModule

  ],
  declarations: [
    IndexPageApplicationContentComponent,
    EditPageApplicationContentComponent,
    CreatePageApplicationContentComponent,
    PageApplicationContentComponent,
    IndexPageApplicationContentDeleteButtonComponent,
    IndexPageApplicationContentEditButtonComponent,
    IndexPageApplicationContentButtonComponent
  ],
  exports: [
    IndexPageApplicationContentComponent,
    EditPageApplicationContentComponent,
    CreatePageApplicationContentComponent,
    PageApplicationContentComponent,
    IndexPageApplicationContentDeleteButtonComponent,
    IndexPageApplicationContentEditButtonComponent,
    IndexPageApplicationContentButtonComponent
  ],
  entryComponents: [
    IndexPageApplicationContentDeleteButtonComponent,
    IndexPageApplicationContentEditButtonComponent,
    IndexPageApplicationContentButtonComponent
  ],
  providers: [
    SystemMessageComponent


  ]
})
export class PageApplicationContentModule {
}
