import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'system-message',
  templateUrl: './system-message.component.html',
  styleUrls: ['./system-message.component.css'],
  inputs: ['message']
})
export class SystemMessageComponent implements OnInit {
  message: string;

  constructor() {
  }

  ngOnInit() {
  }
}
