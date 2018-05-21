import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactAddressComponent} from "./contact-address/contact-address.component";
import {ContactMailComponent} from "./contact-mail/contact-mail.component";
import {ContactPhoneComponent} from "./contact-phone/contact-phone.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ContactAddressComponent,
    ContactMailComponent,
    ContactPhoneComponent
  ],
  exports: [
    ContactAddressComponent,
    ContactMailComponent,
    ContactPhoneComponent
  ]
})
export class SmallBlocksModule {
}
