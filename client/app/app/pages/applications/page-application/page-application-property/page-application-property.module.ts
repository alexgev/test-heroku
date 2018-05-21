import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexPageApplicationPropertyComponent} from './index-page-application-property/index-page-application-property.component';
import {EditPageApplicationPropertyComponent} from './edit-page-application-property/edit-page-application-property.component';
import {CreatePageApplicationPropertyComponent} from './create-page-application-property/create-page-application-property.component';
import {PageApplicationPropertyComponent} from './page-application-property.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {IndexPageApplicationPropertyDeleteButtonComponent} from './index-page-application-property/buttons/index-page-application-property.delete-button.component';
import {IndexPageApplicationPropertyEditButtonComponent} from './index-page-application-property/buttons/index-page-application-property.edit-button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IndexPageApplicationPropertyButtonComponent} from "./index-page-application-property/buttons/index-page-application-property.page-button.component";
import {PagePageApplicationPropertyModule} from './page-page-application-property/page-page-application-property.module';
import {ResourcesModule} from '../../../../resources/resources.module';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    PagePageApplicationPropertyModule,
    ResourcesModule
  ],
  declarations: [
    IndexPageApplicationPropertyComponent,
    EditPageApplicationPropertyComponent,
    CreatePageApplicationPropertyComponent,
    PageApplicationPropertyComponent,
    IndexPageApplicationPropertyDeleteButtonComponent,
    IndexPageApplicationPropertyEditButtonComponent,
    IndexPageApplicationPropertyButtonComponent
  ],
  exports: [
    IndexPageApplicationPropertyComponent,
    EditPageApplicationPropertyComponent,
    CreatePageApplicationPropertyComponent,
    PageApplicationPropertyComponent,
    IndexPageApplicationPropertyDeleteButtonComponent,
    IndexPageApplicationPropertyEditButtonComponent,
    IndexPageApplicationPropertyButtonComponent
  ],
  entryComponents: [
    IndexPageApplicationPropertyDeleteButtonComponent,
    IndexPageApplicationPropertyEditButtonComponent,
    IndexPageApplicationPropertyButtonComponent
  ]
})
export class PageApplicationPropertyModule {
}
