import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: `<button class="btn btn-secondary btn-shadow btn-block btn-sm" [routerLink]="['edit', rowData.id]">
  <i class="fa fa-edit mr-1"></i>Edit</button>`,
})
export class IndexPageApplicationPropertyEditButtonComponent implements OnInit {
  public rowData;
  @Input() row;

  constructor() {
  }

  ngOnInit() {

  }
}
