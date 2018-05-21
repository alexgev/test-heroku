import {Directive, EventEmitter, Input, OnInit} from '@angular/core';
import {RootScope} from "../../classes/rootScope";

@Directive({
  selector: '[theme]'
})
export class ThemeDirective implements OnInit {
  public onSetTheme: EventEmitter<boolean> = new EventEmitter(true);
  @Input('theme') currentTheme: string;
  themeLogo = '';

  constructor(public rootScope: RootScope) {
  }

  ngOnInit() {
    this.setThemeLogo(this.currentTheme);
    this.themeLogo = this.setThemeLogo(this.currentTheme);
  }

  public setThemeLogo(theme: string) {
    let themeLogo = '';
    if (theme == 'white') {
      themeLogo = 'assets/images/logo.png'
    } else if (theme == 'dark') {
      themeLogo = 'assets/images/logo.png';
    }
    /**
     * Проброс события для начальной установки изображения в конструкторе LogoComponent
     */
    this.onSetTheme.emit(true);
    return themeLogo;
  }
}
