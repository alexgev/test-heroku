import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: `<div>{{rowData.updatedAt | date:'medium' }}</div>
              <div>{{rowData.updatedAgo}}</div>`,
})
export class CellUpdatedAtComponent implements OnInit {
  public rowData;
  @Input() row;

  constructor() {
  }

  ngOnInit() {

  }
}
