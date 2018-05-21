import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentUnitService} from '../../../../../../resources/services/content-unit.service';
import {Broadcaster} from '../../../../../../classes/broadcaster';
import {CellActiveComponent} from '../../../../../../resources/components/table-cell/cell-active.component';
import {CellCreatedAtComponent} from '../../../../../../resources/components/table-cell/cell-created-at.component';
import {CellDataComponent} from "../../../../../../resources/components/table-cell/cell-data.component";
import {IndexPagePageApplicationContentEditButtonComponent} from './buttons/index-page-page-application-content.edit-button.component';
import {IndexPagePageApplicationContentDeleteButtonComponent} from './buttons/index-page-page-application-content.delete-button.component';
import {LoaderService} from "../../../../../../resources/services/loader.service";

@Component({
  selector: 'index-page-page-application-content',
  templateUrl: './index-page-page-application-content.component.html',
  styleUrls: ['./index-page-page-application-content.component.css'],
  providers: [LoaderService]
})
export class IndexPagePageApplicationContentComponent implements OnInit {
  subscription: any;
  data: any = {
    contentUnits: []
  };
  contentId: string;
  id: string;
  params: any = {};
  messageTable: string = '';
  settings = {
    actions: false,
    attr: {
      class: 'table mb-0'
    },
    filter: {
      inputClass: 'ng2-smart-filter-small'
    },
    columns: {


      name: {
        title: 'Name'
      },
      editContentUnit: {
        title: 'Edit',
        type: 'custom',
        renderComponent: IndexPagePageApplicationContentEditButtonComponent,
        renderComponentName: 'IndexPagePageApplicationContentEditButtonComponent',
        filter: false,
        sort: false
      },
      deleteContentUnit: {
        title: 'Delete',
        type: 'custom',
        renderComponent: IndexPagePageApplicationContentDeleteButtonComponent,
        renderComponentName: 'IndexPagePageApplicationContentDeleteButtonComponent',
        filter: false,
        sort: false
      },
      icon: {
        title: 'Icon',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<img width="40px" src="${cell}"></img>`
        },
        filter: false,
        sort: false
      },
      type: {
        title: 'Type'
      },
      tags: {
        title: 'Tags'
      },
      order: {
        title: 'Order'
      },
      version: {
        title: 'Version'
      },
      apiLevel: {
        title: 'Api Level'
      },
      priceLevel: {
        title: 'Price Level'
      },
      status: {
        title: 'Status'
      },
      data: {
        title: 'Data',
        type: 'custom',
        renderComponent: CellDataComponent,
        renderComponentName: 'CellDataComponent',
        filter: {
          type: 'checkbox',
          config: {
            true: 'true',
            false: 'false',
            resetText: '',
          },
        },
      },
      active: {
        title: 'Active',
        type: 'custom',
        renderComponent: CellActiveComponent,
        renderComponentName: 'CellActiveComponent',
      },
      createdAt: {
        title: 'CreatedAt',
        type: 'custom',
        renderComponent: CellCreatedAtComponent,
        sortDirection: 'desc',
        renderComponentName: 'CellCreatedAtComponent'
      }


    }
  };

  constructor(private _contentUnitService: ContentUnitService,
              private route: ActivatedRoute,
              private _router: Router,
              public _broadcaster: Broadcaster,
              public _loader: LoaderService,) {
                // if (!this.route.snapshot.params.contentId) {
                //   this._router.navigate(['/apps']);
                // }
    this._broadcaster.on('contentUnitsReceived').subscribe(
      (data: any) => {
        this.data = data;
        if (!this.data.contentUnits.length) this.messageTable = 'There are no data for display';
        this._loader.hide();
      }
    );
    this._broadcaster.on('startReqContentUnits').subscribe(
      () => {
        this._loader.show();
      }
    )
  }

  ngOnInit() {
    this._broadcaster.broadcast('requireContentUnits')


  }

  getContentUnits(contentId) {
    this._loader.show();


  }
  ngOnDestroy() {
  }
}
