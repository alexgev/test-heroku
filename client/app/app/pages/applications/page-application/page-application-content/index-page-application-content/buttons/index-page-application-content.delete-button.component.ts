import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ContentBundleService} from '../../../../../../resources/services/content-bundle.service';

declare var bootbox: any;

@Component({
  template: `<a class="btn btn-danger btn-sm btn-block btn-shadow" (click)="disableContentBundle(rowData.id)">
		<i class="fa fa-trash mr-1"></i>Delete
		</a>`,
})
export class IndexPageApplicationContentDeleteButtonComponent implements OnInit {

  public rowData;
  @Input() row;

  constructor(private _contentBundleService: ContentBundleService,
              private _ngZone: NgZone) {
  }

  ngOnInit() {

  }

  disableContentBundle(id) {
    bootbox.confirm('Are you sure?', (result) => {
      if (result == true) {
        this._contentBundleService.destroyContentBundle(id).then(
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
