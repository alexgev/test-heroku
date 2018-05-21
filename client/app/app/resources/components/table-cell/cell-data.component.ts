import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: `    
    <div style="width: 200px;">
      <a href="{{rowData.data.Location}}" *ngIf="rowData.data" class="d-flex align-items-center">
        <i class="fas fa-download mr-2"></i>
        <span class="text-dotted">{{ rowData.data.viewName }}</span>
      </a>
      <br>
      <a href="{{rowData.cryptedData.Location}}" *ngIf="rowData.cryptedData && rowData.cryptedData.id" class="d-flex align-items-center">
        <i class="fas fa-download mr-2"></i>
        <span class="text-dotted">{{ rowData.cryptedData.viewName }}</span>
      </a>
    </div>`,
})
export class CellDataComponent implements OnInit {
  public rowData;
  @Input() row;

  constructor() {
  }

  ngOnInit() {

  }
}
