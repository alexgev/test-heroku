import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexApplicationComponent} from './index-application/index-application.component';
import {CreateApplicationComponent} from './create-application/create-application.component';
import {EditApplicationComponent} from './edit-application/edit-application.component';
import {ApplicationsComponent} from './applications.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IndexApplicationDeleteButtonComponent} from './index-application/table-component/index-application.delete-button.component';
import {IndexApplicationEditButtonComponent} from './index-application/table-component/index-application.edit-button.component';
import {PageApplicationComponent} from './page-application/page-application.component';
import {IndexApplicationPageButtonComponent} from './index-application/table-component/index-application.page-button.component';
import {PageApplicationModule} from './page-application/page-application.module';
import {ComponentsModule} from "../../resources/components/components.module";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    PageApplicationModule,


  ],
  declarations: [
    IndexApplicationComponent,
    CreateApplicationComponent,
    EditApplicationComponent,
    ApplicationsComponent,
    IndexApplicationDeleteButtonComponent,
    IndexApplicationEditButtonComponent,
    IndexApplicationPageButtonComponent,
    PageApplicationComponent,

  ],
  providers: [
    IndexApplicationComponent,
    CreateApplicationComponent,
    EditApplicationComponent,
    ApplicationsComponent,
    IndexApplicationDeleteButtonComponent,
    IndexApplicationEditButtonComponent,
    IndexApplicationPageButtonComponent
  ],
  exports: [
    IndexApplicationComponent,
    CreateApplicationComponent,
    EditApplicationComponent,
    ApplicationsComponent
  ],
  entryComponents: [
    IndexApplicationDeleteButtonComponent,
    IndexApplicationEditButtonComponent,
    IndexApplicationPageButtonComponent
  ]
})
export class ApplicationsModule {
}
