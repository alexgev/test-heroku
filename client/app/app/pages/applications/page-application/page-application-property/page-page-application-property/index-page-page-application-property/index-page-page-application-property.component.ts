import {Component, OnInit} from '@angular/core';
import {CellActiveComponent} from '../../../../../../resources/components/table-cell/cell-active.component';
import {CellCreatedAtComponent} from '../../../../../../resources/components/table-cell/cell-created-at.component';
import {PropertyService} from '../../../../../../resources/services/property.service';
import {ActivatedRoute} from '@angular/router';
import {Broadcaster} from '../../../../../../classes/broadcaster';
import {IndexPagePageApplicationPropertyEditButtonComponent} from './buttons/index-page-page-application-property.edit-button.component';
import {IndexPagePageApplicationPropertyDeleteButtonComponent} from './buttons/index-page-page-application-property.delete-button.component';
import {PermissionsService} from "../../../../../../resources/services/permissions.service";
import {LoaderService} from "../../../../../../resources/services/loader.service";

@Component({
  selector: 'index-page-page-application-property',
  templateUrl: './index-page-page-application-property.component.html',
  styleUrls: ['./index-page-page-application-property.component.css'],
  providers: [LoaderService]
})
export class IndexPagePageApplicationPropertyComponent implements OnInit {
  subscription: any;
  data: any = {
    properties: []
  };
  contentId: string;
  id: string;
  params: any = {};
  propertyId: string;
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
      editProperty: {
        title: 'Edit',
        type: 'custom',
        renderComponent: IndexPagePageApplicationPropertyEditButtonComponent,
        renderComponentName: 'IndexPagePageApplicationPropertyEditButtonComponent',
        filter: false,
        sort: false
      },
      deleteProperty: {
        title: 'Delete',
        type: 'custom',
        renderComponent: IndexPagePageApplicationPropertyDeleteButtonComponent,
        renderComponentName: 'IndexPagePageApplicationPropertyDeleteButtonComponent',
        filter: false,
        sort: false
      },
      status: {
        title: 'Status'
      },
      value: {
        title: 'Value'
      },
      active: {
        title: 'Active',
        type: 'custom',
        renderComponent: CellActiveComponent,
        renderComponentName: 'CellActiveComponent',
        filter: {
          type: 'checkbox',
          config: {
            true: 'true',
            false: 'false',
            resetText: '',
          },
        },
      },
      createdAt: {
        title: 'CreatedAt',
        type: 'custom',
        renderComponent: CellCreatedAtComponent,
        sortDirection: 'desc',
        renderComponentName: 'CellCreatedAtComponent',
      }
    }
  };

  constructor(private _propertyService: PropertyService,
              private route: ActivatedRoute,
              public _broadcaster: Broadcaster,
              public _permissionsService: PermissionsService,
              public _loader: LoaderService) {
    this._loader.show();
    this._broadcaster.on('propertiesReceived').subscribe(
      (data: any) => {
        this.data.properties = data.properties;
        if (!this.data.properties.length) this.messageTable = 'There is no data for display';
        this._loader.hide();
      }
    );
    this._loader.show();
    this._broadcaster.on('startReqProperties').subscribe(
      () => {
        this._loader.hide();
      }
    )
  }


  ngOnInit() {
    this._broadcaster.broadcast('requireProperties');
  }
}
