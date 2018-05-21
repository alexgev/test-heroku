import {Injectable} from '@angular/core';

@Injectable()
export class LoaderService {
  public isLoading: boolean = false;

  constructor() {
  }

  show() {
    this.isLoading = true;
  }

  hide() {
    this.isLoading = false;
  }

  getStatus() {
    return this.isLoading;
  }
}
