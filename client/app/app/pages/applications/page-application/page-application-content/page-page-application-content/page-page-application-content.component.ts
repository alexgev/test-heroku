import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Routes} from "@angular/router";
import {IndexPagePageApplicationContentComponent} from './index-page-page-application-content/index-page-page-application-content.component';
import {CreatePagePageApplicationContentComponent} from './create-page-page-application-content/create-page-page-application-content.component';
import {EditPagePageApplicationContentComponent} from './edit-page-page-application-content/edit-page-page-application-content.component';
import {AuthorizedUsers} from "../../../../../resources/services/guard.service";
import {ContentUnitService} from '../../../../../resources/services/content-unit.service';
import {Broadcaster} from '../../../../../classes/broadcaster';
import {BroadcastUrlService} from "../../../../../resources/services/broadcast-url.service";


@Component({
  selector: 'page-page-application-page-content',
  templateUrl: './page-page-application-content.component.html',
})
export class PagePageApplicationContentComponent implements OnInit, OnDestroy {
  contentId: string;
  subscribtionOnDestroy: any;
  requireContentUnitsSubscribtion: any;

  constructor(private _contentUnitService: ContentUnitService,
              private _route: ActivatedRoute,
              private _broadcaster: Broadcaster,
              private _broadcastUrlService: BroadcastUrlService) {

    this.contentId = this._route.snapshot.params.contentId;


    this.subscribtionOnDestroy = this._contentUnitService.onDestroyContentUnit.subscribe(
      () => {
        this.getContentUnits(this.contentId);
      })
    this.requireContentUnitsSubscribtion = this._broadcaster.on('requireContentUnits').subscribe(
      () => {
        this.getContentUnits(this.contentId)
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.requireContentUnitsSubscribtion.unsubscribe();
    this.subscribtionOnDestroy.unsubscribe();
  }

  getContentUnits(contentId) {
    this.contentId = contentId;
    this._broadcaster.broadcast('startReqContentUnits')
    this._contentUnitService.asyncGetContentUnits(contentId)
      .then(
        (res: any) => {

          this._broadcaster.broadcast('contentUnitsReceived', res);
          this._broadcastUrlService.setContentName(res.name);
        },
        err => console.log(err)
      )
  }
}
