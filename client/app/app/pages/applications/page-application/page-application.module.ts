import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageApplicationContentModule} from './page-application-content/page-application-content.module';
import {PageApplicationIndexComponent} from './page-application-index/page-application-index.component';
import {PageApplicationPropertyModule} from "./page-application-property/page-application-property.module";
import {ComponentsModule} from "../../../resources/components/components.module";
import {Daterangepicker} from "ng2-daterangepicker";
import {DaterangepickerComponent} from "../../../resources/components/daterangepicker/daterangepicker.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    PageApplicationContentModule,
    PageApplicationPropertyModule,
    Daterangepicker

  ],
  declarations: [
    DaterangepickerComponent,
    PageApplicationIndexComponent


  ],
  providers: [
    DaterangepickerComponent,


  ],
  exports: [],
  entryComponents: []
})
export class PageApplicationModule {
}
