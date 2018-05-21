import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: `<button class="btn btn-secondary btn-block btn-sm btn-shadow" [routerLink]="['/users', 'edit', rowData.id]">
    <i class="fa fa-edit mr-1"></i> Edit User</button>`,
})
export class IndexUserEditButtonComponent implements OnInit {
  public rowData;
  @Input() row;

  constructor() {
  }

  ngOnInit() {

  }
}
