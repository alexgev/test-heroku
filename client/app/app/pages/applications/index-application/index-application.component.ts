import {ApplicationRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApplicationsService} from '../../../resources/services/applications.service';
import {IndexApplicationEditButtonComponent} from './table-component/index-application.edit-button.component';
import {IndexApplicationDeleteButtonComponent} from './table-component/index-application.delete-button.component';
import {IndexApplicationPageButtonComponent} from './table-component/index-application.page-button.component';
import {CellCreatedAtComponent} from "../../../resources/components/table-cell/cell-created-at.component";
import {CellActiveComponent} from "../../../resources/components/table-cell/cell-active.component";
import {PermissionsService} from "../../../resources/services/permissions.service";
import {LoaderService} from "../../../resources/services/loader.service";

@Component({
  selector: 'index-application',
  templateUrl: './index-application.component.html',
  styleUrls: ['./index-application.component.css'],
  providers: [LoaderService]
})
export class IndexApplicationComponent implements OnInit {
  data: any = {};
  err: any = {};
  messageTable: string = '';
  settings: any;
  columns: any = {
    id: {
      title: 'ID'
    },
    name: {
      title: 'Name'
    },
    pageApp: {
      title: 'Page app',
      type: 'custom',
      renderComponent: IndexApplicationPageButtonComponent,
      renderComponentName: 'IndexApplicationPageButtonComponent',
      filter: false,
      sort: false
    },
    editApp: {
      title: 'Edit app',
      type: 'custom',
      renderComponent: IndexApplicationEditButtonComponent,
      renderComponentName: 'IndexApplicationEditButtonComponent',
      filter: false,
      sort: false
    },
    deleteApp: {
      title: 'Delete app',
      type: 'custom',
      renderComponent: IndexApplicationDeleteButtonComponent,
      renderComponentName: 'IndexApplicationDeleteButtonComponent',
      filter: false,
      sort: false
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
      renderComponentName: 'CellCreatedAtComponent',
    }


  }

  constructor(private _router: Router,
              private _applicationsService: ApplicationsService,
              private _applicationRef: ApplicationRef,
              public _permissionsService: PermissionsService,
              public _loader: LoaderService,) {
    this._applicationsService.onDestroyApplication.subscribe(
      () => {
        this.getApplications();
      }
    );
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
    this.getApplications();
  }

  getApplications() {
    this._loader.show();
    this._applicationsService.asyncGetApplications()
      .then((res) => {
        this.data = res;
        if (!this.data.count) this.messageTable = 'There is no data for display';
        this._loader.hide();
      }, (err) => {
        console.log('Error', err);
        this.data = err;
        this.messageTable = 'Sorry, but now the server can\'t display the data';
        this._loader.hide();
      })

  }
}
