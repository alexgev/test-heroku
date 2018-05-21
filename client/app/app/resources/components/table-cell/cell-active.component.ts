import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: `<div class="text-center" *ngIf="rowData.active"><i class="fa fa-check text-secondary"></i></div>
    <div class="text-center" *ngIf="!rowData.active"><i class="fa fa-check text-danger"></i></div>`,
})
export class CellActiveComponent implements OnInit {
  public rowData;
  @Input() row;

  constructor() {
  }

  ngOnInit() {

  }
}
