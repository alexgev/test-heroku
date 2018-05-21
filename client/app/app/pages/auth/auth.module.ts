import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../../resources/components/components.module";
import {LoginComponent} from "./login/login.component";
import {RestoreComponent} from "./restore/restore.component";
import {SignUpComponent} from "./signup/signup.component";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    RestoreComponent,
    SignUpComponent
  ],
  providers: [
    LoginComponent,
    RestoreComponent,
    SignUpComponent
  ],
  exports: [
    LoginComponent,
    RestoreComponent,
    SignUpComponent
  ]
})
export class AuthModule {
}
