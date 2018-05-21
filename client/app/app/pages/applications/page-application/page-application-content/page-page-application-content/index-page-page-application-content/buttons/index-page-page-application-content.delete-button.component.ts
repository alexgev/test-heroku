import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ContentUnitService} from '../../../../../../../resources/services/content-unit.service';
import {PermissionsService} from "../../../../../../../resources/services/permissions.service";

declare var bootbox: any;

@Component({
  template: `<a class="btn btn-danger btn-sm btn-block btn-shadow" (click)="disableContentUnit(rowData.id)"
                *ngIf="_permissionsService.haveRightToDisplayComponent('IndexPagePageApplicationContentDeleteButtonComponent', {'status': rowData.status})">
		<i class="fa fa-trash mr-1"></i>Delete
		</a>`,
})
export class IndexPagePageApplicationContentDeleteButtonComponent implements OnInit {

  public rowData;
  @Input() row;

  constructor(public _permissionsService: PermissionsService,
              private _contentUnitService: ContentUnitService,
              private _ngZone: NgZone) {
  }

  ngOnInit() {

  }

  disableContentUnit(id) {
    bootbox.confirm('Are you sure?', (result) => {
      if (result == true) {
        this._contentUnitService.destroyContentUnit(id).then(
          res => {
            // this._ngZone.run(() => {
            // });


          },
          err => console.log(err)
        )
      }
    });
  }
}
