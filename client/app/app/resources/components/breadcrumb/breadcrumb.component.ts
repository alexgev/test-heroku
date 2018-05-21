import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadCrumb} from "../../../interfaces/breadCrumb";
import {Broadcaster} from '../../../classes/broadcaster';
import {BroadcastUrlService} from "../../services/broadcast-url.service";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Array<BreadCrumb> = [];

  constructor(private _activatedRoute: ActivatedRoute,
              private router: Router,
              private _broadcaster: Broadcaster,
              private _broadcastUrlService: BroadcastUrlService) {

    let self = this;
    this._broadcaster.on('setName').subscribe(
      () => {
        self.breadcrumbs = self.buildBreadCrumb(this._activatedRoute.root)
      }
    )
    this.router.events.subscribe((val) => {
      self.breadcrumbs = self.buildBreadCrumb(this._activatedRoute.root)
    })
  }

  ngOnInit() {
    this.breadcrumbs = this.buildBreadCrumb(this._activatedRoute.root);
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '',
                  breadcrumbs: Array<BreadCrumb> = []) {

    const label = this.getLabel(route);
    const path = route.routeConfig ? route.routeConfig.path : '';




    let newBreadcrumbs;
    let nextUrl;
    if (path != '') {
      nextUrl = `${url}${path}/`;
      nextUrl = this.replaceUrl(nextUrl, route.snapshot.params);
      let breadcrumb = {
        label: label,
        url: nextUrl,
        params: ''
      };
      newBreadcrumbs = [...breadcrumbs, breadcrumb];
    } else {
      newBreadcrumbs = [...breadcrumbs];
    }
    if (route.firstChild) {


      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

  getLabel(route) {
    if (route.routeConfig && route.routeConfig.data) {
      if (route.routeConfig.data['varName']) {
        if (this._broadcastUrlService.getName(route.routeConfig.data['varName']))
          return this._broadcastUrlService.getName(route.routeConfig.data['varName'])
      }
      return route.routeConfig.data['title'];
    } else {
      return ''
    }
  }

  replaceUrl(url, params) {


    url = url.replace(':appId', params.appId);
    url = url.replace(':contentId', params.contentId);
    url = url.replace(':propertyId', params.propertyId);

    return url;
  }
}
