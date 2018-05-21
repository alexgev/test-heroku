import {Component, Input, OnInit} from '@angular/core';
import {PermissionsService} from "../../../../../../../resources/services/permissions.service";

@Component({
  template: `<button class="btn btn-secondary btn-shadow btn-block btn-sm" [routerLink]="['edit', rowData.id]"
    *ngIf="_permissionsService.haveRightToDisplayComponent('IndexPagePageApplicationPropertyEditButtonComponent', {'status': rowData.status})">
    <i class="fa fa-edit mr-1"></i>Edit</button>`,
})
export class IndexPagePageApplicationPropertyEditButtonComponent implements OnInit {
  public rowData;
  @Input() row;

  constructor(public _permissionsService: PermissionsService) {
  }

  ngOnInit() {
  }
}
