import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApplicationsService} from '../../../../resources/services/applications.service';
import {StatService} from "../../../../resources/services/stat.service";

@Component({
  selector: 'page-application-index',
  templateUrl: './page-application-index.component.html',
  styleUrls: ['./page-application-index.component.css']
})
export class PageApplicationIndexComponent implements OnInit {
  appId: any;
  activeProperties: any[] = [];
  activeContentUnits: any[] = [];
  propertyBundles: any[] = [];
  contentBundles: any[] = [];
  start: any;
  end: any;
  public isLoadingActive: boolean = true;
  public isLoadingRequest: boolean = true;

  constructor(private route: ActivatedRoute,
              private _applicationsService: ApplicationsService,
              private _statService: StatService,) {
  }

  ngOnInit() {
    this.appId = this.route.snapshot.params.appId;
    this.getDataByPeriod();
    this.isLoadingActive = true;
    this._statService.asyncGetActive(this.appId)
      .then(
        (res: any) => {
          this.activeProperties = res['property'];
          this.activeContentUnits = res['content'];
          this.isLoadingActive = false;
        },
        err => {
          console.log(err);
          this.isLoadingActive = false;
        }
      )
  }

  getDataByPeriod() {
    this.isLoadingRequest = true;
    this._statService.asyncRequestCount(this.appId, {start: this.start, end: this.end})
      .then(
        (res: any) => {
          this.propertyBundles = res['property'];
          this.contentBundles = res['content'];
          this.isLoadingRequest = false;
        },
        err => {
          console.log(err);
          this.isLoadingRequest = false;
        }
      )
  }

  sendRequest(event) {
    this.end = new Date(event.endDate);
    this.start = new Date(event.startDate);
    this.getDataByPeriod();
  }
}
