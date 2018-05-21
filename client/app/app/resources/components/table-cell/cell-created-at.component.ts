import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: `<div>{{rowData.createdAt | date:'medium' }}</div>
              <div>{{rowData.createdAgo}}</div>`,
})
export class CellCreatedAtComponent implements OnInit {
  public rowData;
  @Input() row;

  constructor() {
  }

  ngOnInit() {
  }
}
