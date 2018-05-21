import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatePagePageApplicationPropertyComponent} from './create-page-page-application-property/create-page-page-application-property.component';
import {EditPagePageApplicationPropertyComponent} from './edit-page-page-application-property/edit-page-page-application-property.component';
import {IndexPagePageApplicationPropertyComponent} from './index-page-page-application-property/index-page-page-application-property.component';
import {RouterModule} from '@angular/router';
import {
  PagePageApplicationPropertyComponent
} from './page-page-application-property.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ResourcesModule} from "../../../../../resources/resources.module";
import {IndexPagePageApplicationPropertyButtonComponent} from "./index-page-page-application-property/buttons/index-page-page-application-property.page-button.component";
import {IndexPagePageApplicationPropertyEditButtonComponent} from "./index-page-page-application-property/buttons/index-page-page-application-property.edit-button.component";
import {IndexPagePageApplicationPropertyDeleteButtonComponent} from "./index-page-page-application-property/buttons/index-page-page-application-property.delete-button.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    ResourcesModule
  ],
  declarations: [
    CreatePagePageApplicationPropertyComponent,
    EditPagePageApplicationPropertyComponent,
    IndexPagePageApplicationPropertyComponent,
    IndexPagePageApplicationPropertyButtonComponent,
    IndexPagePageApplicationPropertyEditButtonComponent,
    IndexPagePageApplicationPropertyDeleteButtonComponent,
    PagePageApplicationPropertyComponent
  ],
  entryComponents: [
    IndexPagePageApplicationPropertyButtonComponent,
    IndexPagePageApplicationPropertyEditButtonComponent,
    IndexPagePageApplicationPropertyDeleteButtonComponent
  ]
})
export class PagePageApplicationPropertyModule {
}
