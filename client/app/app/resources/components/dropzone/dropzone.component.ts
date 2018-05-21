import {Component, Input} from '@angular/core';
import {Broadcaster} from '../../../classes/broadcaster';
import {UrlService} from "../../services/url.service";

@Component({
  selector: 'my-dropzone',
  templateUrl: './dropzone.component.html',
  inputs: ['options']
})
export class MyDropzoneComponent {
  public _config: any = {
    selfUrlService: this._urlService,
    getIcon: function (type) {
      switch (this.paramName) {
        case 'image':
          return (type === 'far') ? 'far fa-file-image' : 'fas fa-file-image';
        case 'archive':
          return (type === 'far') ? 'far fa-file-archive' : 'fas fa-file-archive';
        default:
          return (type === 'far') ? 'far fa-file' : 'fas fa-file';
      }
    },
    getUrl: function () {
      switch (this.paramName) {
        case 'image':
          return this.selfUrlService.uploadIcon();
        case 'archive':
          return this.selfUrlService.uploadArchive();
        default:
          return this.selfUrlService.uploadDefault();
      }
    },
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    withCredentials: true,
    paramName: 'image',
    acceptedFiles: 'image/*',
    headers: {


      'Cache-Control': null,
      'X-Requested-With': null
    },
    dictCancelUpload: 'Сancel loading',
    dictRemoveFile: 'Remove the file',
    previewTemplate: '<div class="dz-preview dz-file-preview dz-clickable">' +
    '<div class="dz-details">' +
    '<div class="dz-message-success add-file" data-dz-remove ><span><i class="dz-icon fas fa-times"></i>Remove the file</span>' +
    '</div>' +
    '<div class="dz-message-error add-file" data-dz-remove><span><i class="dz-icon fas fa-exclamation-triangle"></i>Repeat</span>' +
    '</div>' +
    '<div class="dz-filename"><span data-dz-name></span></div>' +
    '<div class="dz-error-mark">Error loading</div>' +
    '<div class="dz-error-text" data-dz-errormessage></div>' +
    '</div>' +
    '<div class="dz-progress">' +
    '<i class="dz-icon fas fa-circle-notch fa-spin"></i>' +
    '</div>' +
    '</div>',
  };
  public config: any;

  constructor(public _broadcaster: Broadcaster,
              private _urlService: UrlService,) {


  }

  public _options: Object;
  @Input()
  set options(data: any) {
    this._config = Object.assign(this._config, data);
  }

  ngOnInit() {
    this._config.dictDefaultMessage = `
      <span class="dz-text-main">
      <i class="dz-icon ` + this._config.getIcon('fas') + `"></i>Choose the file
      </span>
      <span class="dz-text">The file is not chosen</span>`;
    this._config.url = this._config.getUrl();
    this.config = this._config;
  }

  onUploadError(event) {
  }

  onUploadSuccess(event) {
    switch (this.config.paramName) {
      case 'image':
        this._broadcaster.broadcast('iconUploaded', event[1]);
        break;
      case 'archive':
        this._broadcaster.broadcast('archiveUploaded', event[1]);
        break;
      default:
        break;
    }


  }

  onUploadRemoved() {
    switch (this.config.paramName) {
      case 'image':
        this._broadcaster.broadcast('removedIcon');
        break;
      case 'archive':
        this._broadcaster.broadcast('removedArchive');
        break;
      default:
        break;
    }
  }
}
