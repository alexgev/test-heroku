import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: `<button class="btn btn-success btn-sm" [routerLink]="['page', rowData.id]">Page Content Bundle</button>`,
})
export class IndexPageApplicationPropertyButtonComponent implements OnInit {
  public rowData;
  @Input() row;

  constructor() {
  }

  ngOnInit() {

  }
}
