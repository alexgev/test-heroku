import {Component, OnInit} from '@angular/core';
import {ContentBundleService} from '../../../../../resources/services/content-bundle.service';
import {ActivatedRoute} from '@angular/router';
import {Broadcaster} from '../../../../../classes/broadcaster';
import {IndexPageApplicationContentDeleteButtonComponent} from './buttons/index-page-application-content.delete-button.component';
import {IndexPageApplicationContentEditButtonComponent} from './buttons/index-page-application-content.edit-button.component';
import {IndexPageApplicationContentButtonComponent} from './buttons/index-page-application-content.page-button.component';
import {CellActiveComponent} from '../../../../../resources/components/table-cell/cell-active.component';
import {CellCreatedAtComponent} from '../../../../../resources/components/table-cell/cell-created-at.component';
import {PermissionsService} from "../../../../../resources/services/permissions.service";
import {LoaderService} from "../../../../../resources/services/loader.service";

@Component({
  selector: 'index-page-application-content',
  templateUrl: './index-page-application-content.component.html',
  styleUrls: ['./index-page-application-content.component.css'],
  providers: [LoaderService]
})
export class IndexPageApplicationContentComponent implements OnInit {
  subscription: any;
  data: any = {
    contentBundles: []
  };
  eventOnDestroy: any;
  id: string;
  params: any = {};
  messageTable: string = '';
  settings: any;
  columns: any = {


    name: {
      title: 'Name'
    },
    pageContentBundle: {
      title: 'Page',
      type: 'custom',
      renderComponent: IndexPageApplicationContentButtonComponent,
      renderComponentName: 'IndexPageApplicationContentButtonComponent',
      filter: false,
      sort: false
    },
    editContentBundle: {
      title: 'Edit',
      type: 'custom',
      renderComponent: IndexPageApplicationContentEditButtonComponent,
      renderComponentName: 'IndexPageApplicationContentEditButtonComponent',
      filter: false,
      sort: false
    },
    deleteContentBundle: {
      title: 'Delete',
      type: 'custom',
      renderComponent: IndexPageApplicationContentDeleteButtonComponent,
      renderComponentName: 'IndexPageApplicationContentDeleteButtonComponent',
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
        return `<img width="40px" src="${cell}">`
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
      sortDirection: 'desc',
      renderComponent: CellCreatedAtComponent,
      renderComponentName: 'CellCreatedAtComponent'
    }


  }

  constructor(private _contentBundleService: ContentBundleService,
              private route: ActivatedRoute,
              public broadcaster: Broadcaster,
              public _permissionsService: PermissionsService,
              public _loader: LoaderService) {
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

    this.eventOnDestroy = this._contentBundleService.onDestroyContentBundle.subscribe(
      () => {
        this.getContentBundles(this.params.appId);
      }
    );
    this.getContentBundles(this.params.appId);
  }

  getContentBundles(appId) {
    this._loader.show();
    this._contentBundleService.asyncGetContentBundles(appId)
      .then(
        res => {
          this.data = res;
          if (!this.data.contentBundles.length) this.messageTable = 'There is no data for display';
          this._loader.hide();
        },
        err => {
          console.log(err);
          this.data = err;
          this.messageTable = 'Sorry, but now the server can\'t display the data';
          this._loader.hide();
        }
      )
  }

  ngOnDestroy() {
    this.eventOnDestroy.unsubscribe();
  }
}
