import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {ToastrModule} from "ngx-toastr";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RootScope} from "./classes/rootScope";
import {Broadcaster} from "./classes/broadcaster";
import {PagesModule} from "./pages/pages.module";
import {AppComponent} from './app.component';
import {ResourcesModule} from "./resources/resources.module";
import {Collaborator} from "./classes/collaborator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    ResourcesModule,
    PagesModule
  ],
  providers: [
    RootScope,
    Broadcaster,
    Collaborator,
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}
