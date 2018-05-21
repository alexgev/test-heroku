import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: `<button class="btn btn-primary btn-shadow btn-block btn-sm" [routerLink]="['/apps', 'page', rowData.id]">Page</button>`,
})
export class IndexApplicationPageButtonComponent implements OnInit {
  public rowData;
  @Input() row;

  constructor() {
  }

  ngOnInit() {
  }
}
