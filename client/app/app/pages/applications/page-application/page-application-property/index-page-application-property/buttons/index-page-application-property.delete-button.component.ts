import {Component, Input, NgZone, OnInit} from '@angular/core';
import {PropertyBundleService} from '../../../../../../resources/services/property-bundle.service';

declare var bootbox: any;

@Component({
  template: `<a class="btn btn-danger btn-sm btn-block btn-shadow" (click)="disablePropertyBundle(rowData.id)">
	<i class="fa fa-trash mr-1"></i>Delete
	</a>`,
})
export class IndexPageApplicationPropertyDeleteButtonComponent implements OnInit {
  public rowData;
  @Input() row;

  constructor(private _propertyBundleService: PropertyBundleService,
              private _ngZone: NgZone) {
  }

  ngOnInit() {

  }

  disablePropertyBundle(id) {
    bootbox.confirm('Are you sure?', (result) => {
      if (result == true) {
        this._propertyBundleService.destroyPropertyBundle(id).then(
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
