import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PropertyService} from '../../../../../resources/services/property.service';
import {Broadcaster} from '../../../../../classes/broadcaster';
import {BroadcastUrlService} from "../../../../../resources/services/broadcast-url.service";


@Component({
  selector: 'page-page-application-page-property',
  templateUrl: './page-page-application-property.component.html',
})
export class PagePageApplicationPropertyComponent implements OnInit, OnDestroy {
  propertyId: string;
  requirePropertiesSubscribtion: any;
  subscriptionOnDestroy: any;

  constructor(private _route: ActivatedRoute,
              private _propertyService: PropertyService,
              private _broadcaster: Broadcaster,
              private _broadcastUrlService: BroadcastUrlService) {

    this.propertyId = this._route.snapshot.params.propertyId;

    this.subscriptionOnDestroy = this._propertyService.onDestroyProperty.subscribe(
      () => {
        this.getProperties(this.propertyId);
      }
    );
    this.requirePropertiesSubscribtion = this._broadcaster.on('requireProperties').subscribe(() => {
      this.getProperties(this.propertyId);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.requirePropertiesSubscribtion.unsubscribe();
    this.subscriptionOnDestroy.unsubscribe();
  }

  getProperties(propertyId) {
    this.propertyId = propertyId;
    this._propertyService.asyncGetProperties(propertyId)
      .then(
        (res: any) => {
          this._broadcaster.broadcast('propertiesReceived', res);
          this._broadcastUrlService.setPropertiesName(res.name);
        },
        err => console.log(err)
      )
  }
}
