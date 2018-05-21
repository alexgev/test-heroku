import {Component} from '@angular/core';
import {
  Event as RouterEvent,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router'
import {RootScope} from "./classes/rootScope";
import {AuthService} from "./resources/services/auth.service";
import {LoaderService} from "./resources/services/loader.service";
import {Broadcaster} from "./classes/broadcaster";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [LoaderService]
})
export class AppComponent {
  color: string;
  authorized: boolean = false;
  isDisconnect: boolean = false;

  constructor(private _router: Router,
              public rootScope: RootScope,
              private _authService: AuthService,
              public loader: LoaderService,
              private _broadcaster: Broadcaster) {
    _router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    });
    this._broadcaster.on('disconnected').subscribe(() => {
      console.log('disconnected');
      this.isDisconnect = true;
    })
    this._broadcaster.on('connected').subscribe(() => {
      console.log('connected');
      this.isDisconnect = false;
    })
    this._authService.onCheckAuthorization.subscribe({
      next: (auth: boolean) => {

        this.authorized = this.rootScope.auth;
      }
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loader.show();
    }
    if (event instanceof NavigationEnd) {
      this.loader.hide();
    }

    if (event instanceof NavigationCancel) {
      this.loader.hide();
    }
    if (event instanceof NavigationError) {
      this.loader.hide();
    }
  }
}
