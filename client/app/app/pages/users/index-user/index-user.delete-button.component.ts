import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../../../resources/services/users.service';

declare var bootbox: any;

@Component({
  template: `<a class="btn btn-danger btn-block btn-sm btn-shadow" (click)="deleteUser(rowData.id)">Delete User</a>`,
})
export class IndexUserDeleteButtonComponent implements OnInit {
  public rowData;
  @Input() row;

  constructor(private _usersService: UsersService) {
  }

  ngOnInit() {

  }

  deleteUser(id) {
    bootbox.confirm('Are you sure?', (result) => {
      if (result == true) {
        this._usersService.destroyUser(id).then(
          res => console.log(res),
          err => console.log(err)
        )
      }
    });
  }
}
