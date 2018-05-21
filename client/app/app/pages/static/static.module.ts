import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PageNotFoundComponent
  ],
  declarations: [PageNotFoundComponent]
})
export class StaticModule {
}
