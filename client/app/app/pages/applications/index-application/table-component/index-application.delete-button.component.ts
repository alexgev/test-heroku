import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ApplicationsService} from '../../../../resources/services/applications.service';
import {PermissionsService} from "../../../../resources/services/permissions.service";

declare var bootbox: any;

@Component({
  template: `<a class="btn btn-danger btn-sm btn-block btn-shadow" (click)="deleteApplication(rowData.id)">
    <i class="fa fa-trash mr-1"></i>Delete
  </a>`
})
export class IndexApplicationDeleteButtonComponent implements OnInit {
  public rowData;
  @Input() row;

  constructor(private _applicationsService: ApplicationsService,
              private _ngZone: NgZone,
              public _permissionsService: PermissionsService) {
  }

  ngOnInit() {
  }

  deleteApplication(id) {
    bootbox.confirm('Are you sure?', (result) => {
      if (result == true) {
        this._applicationsService.destroyApplication(id).then(
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
