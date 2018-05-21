import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Broadcaster} from '../../../../../classes/broadcaster';
import {IndexPageApplicationPropertyEditButtonComponent} from "./buttons/index-page-application-property.edit-button.component";
import {IndexPageApplicationPropertyDeleteButtonComponent} from "./buttons/index-page-application-property.delete-button.component";
import {PropertyBundleService} from "../../../../../resources/services/property-bundle.service";
import {CellActiveComponent} from '../../../../../resources/components/table-cell/cell-active.component';
import {CellCreatedAtComponent} from '../../../../../resources/components/table-cell/cell-created-at.component';
import {IndexPagePageApplicationContentButtonComponent} from '../../page-application-content/page-page-application-content/index-page-page-application-content/buttons/index-page-page-application-content.page-button.component';
import {PermissionsService} from "../../../../../resources/services/permissions.service";
import {LoaderService} from "../../../../../resources/services/loader.service";

@Component({
  selector: 'index-page-application-content',
  templateUrl: './index-page-application-property.component.html',
  styleUrls: ['./index-page-application-property.component.css'],
  providers: [LoaderService]
})
export class IndexPageApplicationPropertyComponent implements OnInit {
  subscription: any;
  data: any = {
    propertyBundles: []
  };
  id: string;
  params: any = {};
  messageTable: string = '';
  settings: any = [];
  columns: any = {


    name: {
      title: 'Name'
    },
    pagePropertyBundle: {
      title: 'Page',
      type: 'custom',
      renderComponent: IndexPagePageApplicationContentButtonComponent,
      renderComponentName: 'IndexPagePageApplicationContentButtonComponent',
      filter: false,
      sort: false
    },
    editPropertyBundle: {
      title: 'Edit Content Bundle',
      type: 'custom',
      renderComponent: IndexPageApplicationPropertyEditButtonComponent,
      renderComponentName: 'IndexPageApplicationPropertyEditButtonComponent',
      filter: false,
      sort: false
    },
    deletePropertyBundle: {
      title: 'Delete app',
      type: 'custom',
      renderComponent: IndexPageApplicationPropertyDeleteButtonComponent,
      renderComponentName: 'IndexPageApplicationPropertyDeleteButtonComponent',
      filter: false,
      sort: false
    },
    displayName: {
      title: 'DisplayName'
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

  constructor(private _propertyBundleService: PropertyBundleService,
              private route: ActivatedRoute,
              public _permissionsService: PermissionsService,
              public broadcaster: Broadcaster,
              public _loader: LoaderService,) {
    /**
     * Вывод колонок таблицы в зависимости от permissions
     */
    this.columns = _permissionsService.filterColumns(this.columns);
    this.settings = {
      actions: false,
      attr: {
        class: 'table mb-0'
      },
      filter: {
        inputClass: 'ng2-smart-filter-small'
      },
      columns: this.columns
    };
  }

  ngOnInit() {
    this.params.appId = this.route.snapshot.params.appId;
    this.params.id = this.route.snapshot.params.unitId;
    this.params.contentBundleId = this.route.snapshot.params.contentId;

    this._propertyBundleService.onDestroyPropertyBundle.subscribe(
      () => {
        this.getPropertyBundles(this.params.appId);
      }
    );
    this.getPropertyBundles(this.params.appId);
  }

  getPropertyBundles(appId) {
    this._loader.show();
    this._propertyBundleService.asyncGetPropertyBundles(appId)
      .then(
        res => {
          this.data = res;
          if (!this.data.propertyBundles.length) this.messageTable = 'There is no data for display';
          this._loader.hide();
        },
        err => {
          console.log('Error', err);
          this.data = err;
          this.messageTable = 'Sorry, but now the server can\'t display the data';
          this._loader.hide();
        }
      )
  }
}
