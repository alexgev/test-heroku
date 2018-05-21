import {Component} from '@angular/core';

@Component({
  selector: 'preloader',
  templateUrl: './preloader.component.html',
  inputs: ['class']
})
export class PreloaderComponent {
  class: string;
}
