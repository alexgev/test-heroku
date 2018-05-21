import {Component, Input, NgZone, OnInit} from '@angular/core';
import {PropertyService} from '../../../../../../../resources/services/property.service';
import {PermissionsService} from "../../../../../../../resources/services/permissions.service";

declare var bootbox: any;

@Component({
  template: `<a class="btn btn-danger btn-sm btn-block btn-shadow" (click)="disableProperty(rowData.id)"
                *ngIf="_permissionsService.haveRightToDisplayComponent('IndexPagePageApplicationPropertyDeleteButtonComponent', {'status': rowData.status})">
		<i class="fa fa-trash mr-1"></i>Delete
		</a>`,
})
export class IndexPagePageApplicationPropertyDeleteButtonComponent implements OnInit {
  public rowData;
  @Input() row;

  constructor(private _propertyService: PropertyService,
              public _permissionsService: PermissionsService,
              private _ngZone: NgZone) {
  }

  ngOnInit() {
  }

  disableProperty(id) {
    bootbox.confirm('Are you sure?', (result) => {
      if (result == true) {
        this._propertyService.destroyProperty(id).then(
          res => {
            this._ngZone.run(() => {
            });

          },
          err => console.log(err)
        )
      }
    });
  }
}
