import {Injectable} from '@angular/core';

@Injectable()
export class HandlerService {
  constructor() {
  }

  /**
   * Функция поиска индекса элемента нужного массива по ключу из другого массива
   */
  findIndexByKeyValue(key: any, soughtArray: any) {
    for (let parent in soughtArray) {
      if (key == soughtArray[parent].name) {
        return parent
      }
    }
  }
}
