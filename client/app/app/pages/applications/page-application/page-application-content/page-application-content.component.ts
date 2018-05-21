import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'application-page-content',
  templateUrl: './page-application-content.component.html',
})
export class PageApplicationContentComponent implements OnInit {
  constructor(private _route: ActivatedRoute) {

  }

  contentId = this._route.snapshot.params.contentId;

  ngOnInit() {
  }
}

