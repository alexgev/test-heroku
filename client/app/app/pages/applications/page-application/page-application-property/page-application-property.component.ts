import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'application-page-property',
  templateUrl: './page-application-property.component.html',
})
export class PageApplicationPropertyComponent implements OnInit {
  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit() {
  }
}

