import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexPagePageApplicationContentComponent} from './index-page-page-application-content/index-page-page-application-content.component';
import {EditPagePageApplicationContentComponent} from './edit-page-page-application-content/edit-page-page-application-content.component';
import {CreatePagePageApplicationContentComponent} from './create-page-page-application-content/create-page-page-application-content.component';
import {
  PagePageApplicationContentComponent,
} from './page-page-application-content.component';
import {RouterModule} from '@angular/router';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IndexPagePageApplicationContentButtonComponent} from './index-page-page-application-content/buttons/index-page-page-application-content.page-button.component';
import {IndexPagePageApplicationContentDeleteButtonComponent} from './index-page-page-application-content/buttons/index-page-page-application-content.delete-button.component';
import {IndexPagePageApplicationContentEditButtonComponent} from './index-page-page-application-content/buttons/index-page-page-application-content.edit-button.component';
import {ResourcesModule} from '../../../../../resources/resources.module';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    ResourcesModule
  ],
  declarations: [
    IndexPagePageApplicationContentComponent,
    EditPagePageApplicationContentComponent,
    CreatePagePageApplicationContentComponent,
    PagePageApplicationContentComponent,
    IndexPagePageApplicationContentButtonComponent,
    IndexPagePageApplicationContentDeleteButtonComponent,
    IndexPagePageApplicationContentEditButtonComponent
  ],
  exports: [
    IndexPagePageApplicationContentComponent,
    EditPagePageApplicationContentComponent,
    CreatePagePageApplicationContentComponent,
    PagePageApplicationContentComponent
  ],
  entryComponents: [
    IndexPagePageApplicationContentButtonComponent,
    IndexPagePageApplicationContentDeleteButtonComponent,
    IndexPagePageApplicationContentEditButtonComponent
  ],
  providers: []
})
export class PagePageApplicationContentModule {
}
