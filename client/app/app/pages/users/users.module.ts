import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from '@ng-select/ng-select';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UsersComponent} from "./users.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {IndexUserComponent} from "./index-user/index-user.component";
import {IndexUserEditButtonComponent} from './index-user/index-user.edit-button.component';
import {IndexUserDeleteButtonComponent} from './index-user/index-user.delete-button.component';
import {ComponentsModule} from "../../resources/components/components.module";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgSelectModule,

    NgbModule
  ],
  declarations: [
    CreateUserComponent,
    EditUserComponent,
    IndexUserComponent,
    UsersComponent,
    IndexUserEditButtonComponent,
    IndexUserDeleteButtonComponent
  ],
  providers: [
    CreateUserComponent,
    EditUserComponent,
    IndexUserComponent,
    UsersComponent
  ],
  exports: [
    CreateUserComponent,
    EditUserComponent,
    IndexUserComponent,
    UsersComponent
  ],
  entryComponents: [
    IndexUserEditButtonComponent,
    IndexUserDeleteButtonComponent
  ]
})
export class UsersModule {
}
