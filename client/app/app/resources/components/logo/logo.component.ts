import {Component} from '@angular/core';
import {RootScope} from "../../../classes/rootScope";
import {ThemeDirective} from "../../directives/theme.directive";

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html'
})
export class LogoComponent {
  logoImage: string;

  constructor(public rootScope: RootScope,
              private _themeDirective: ThemeDirective) {
    /**
     * Установка изображения логотипа в зависимости от темы, указанной в директиве блока
     */
    this._themeDirective.onSetTheme.subscribe({
      next: () => {
        this.logoImage = this._themeDirective.themeLogo;
      }
    })
  }
}
