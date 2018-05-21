import {Component, OnInit} from '@angular/core';
import {Broadcaster} from "../../../classes/broadcaster";
import {HttpClient} from "@angular/common/http";
import {RequestOption} from "../../../classes/request-options";
import {UrlService} from "../../services/url.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {
  message: string = '';
  self: any;
  disconnected: boolean = false;

  constructor(private _broadcaster: Broadcaster,
              private _http: HttpClient,
              private _requestOption: RequestOption,
              private _urlService: UrlService,
              private _userService: UsersService) {
  }

  ngOnInit() {
    let self = this;
    let timer: any;
    setInterval(() => {
      timer = setTimeout(() => {
        if (!self.disconnected) {
          self._broadcaster.broadcast('disconnected');
          self.disconnected = true;
        }
      }, 31000);
      this._userService.ping().then(() => {
        if (self.disconnected) {
          self._broadcaster.broadcast('connected');
          self.disconnected = false;
        }
        clearTimeout(timer);
      }, (err) => {
        if (self.disconnected) {
          clearTimeout(timer);
        }
      })
    }, 30000)
  }
}
