import {Component, OnInit} from '@angular/core';
import {appRoutes} from "../../../classes/appRoutes";
import {ParentRoutes} from "../../../classes/parentRoutes";
import {HandlerService} from "../../services/handler.service";
import {PermissionsService} from "../../services/permissions.service";
import {Broadcaster} from "../../../classes/broadcaster";

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public pages: any = [];

  constructor(private _parentRoutes: ParentRoutes,
              private _handlerService: HandlerService,
              private _permissionsService: PermissionsService,
              private _broadcaster: Broadcaster) {
    this._broadcaster.on('checkedAuth').subscribe(() => {
      this.buildSidebar()
    })
  }

  ngOnInit() {
  }

  buildSidebar() {
    let routes = appRoutes;
    let pages = [];
    let parents = []
    let self = this;
    /**
     * Ищем наличие свойства 'parent' у элемента appRoutes. Если найдено, то записываем элемент как дочерний в свойство child соответствующего родителя. Если нет - записываем в массив страниц
     */
    routes.forEach((item, i, array) => {
      if (item['data'] && item['data'].parent) {
        let idx: any = self._handlerService.findIndexByKeyValue(item['data'].parent, self._parentRoutes.parentRoutes);
        self._parentRoutes.parentRoutes[idx].data.childrens.push(item);
        parents = self._parentRoutes.parentRoutes;
      } else {
        pages.push(item);
      }
    })
    /**
     * Массив страниц соединяем с массивом родительских страниц
     */
    pages = pages.concat(parents);
    /**
     * Если у страницы есть свойство data, то выводим его как таб в sidebar
     */
    let tmpPages: any[] = [];
    for (let page of pages) {
      if (page.data && !page.data.hidden) {
        if (self._permissionsService.haveRightToDisplayComponent(page.data.componentName))
          tmpPages.push(page)
      }
    }
    /**
     * Сортируем массив
     */
    tmpPages.sort((a, b) => {
      return a['data'].index - b['data'].index
    });
    this.pages = tmpPages;
  }
}
