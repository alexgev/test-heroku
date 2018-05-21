import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Broadcaster} from '../../../classes/broadcaster';
import {ApplicationsService} from '../../../resources/services/applications.service';
import {BroadcastUrlService} from "../../../resources/services/broadcast-url.service";


@Component({
  selector: 'page-application',
  templateUrl: './page-application.component.html',
  styleUrls: ['./page-application.component.css']
})
export class PageApplicationComponent implements OnInit {

  appId: string;

  constructor(private route: ActivatedRoute,
              private _broadCaster: Broadcaster,
              private _applicationsService: ApplicationsService,
              private _broadcastUrlService: BroadcastUrlService) {

    this.appId = this.route.snapshot.params.appId;

  }

  ngOnInit() {

    this._applicationsService.getApplicationById(this.appId)
      .then(
        (res: any) => {
          this._broadcastUrlService.setAppName(res.name);
        },
        err => console.log(err)
      )
  }

}
