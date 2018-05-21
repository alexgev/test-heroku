import * as moment from 'moment';

moment.locale('en');

export class DaterangepickerService {
  months: Array<string> = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  day: number = parseInt(moment().format('DD'));
  month: number = parseInt(moment().format('MM'));
  quarter: number = Math.ceil(this.month / 3);
  quarterRoman: string = this.getRomanNumerals(this.quarter);
  year: number = parseInt(moment().format('YYYY'));
  /**
   * Массив периодов для выбора
   */
  rangesArr: Array<object> = [
    {
      name: 'Last year',
      value: [moment().subtract(12, 'month').startOf('day'), moment()]
    },
    {
      name: 'This year',
      value: [moment().startOf('year').startOf('day'), moment()]
    },


    {
      name: 'Last 30 days',
      value: [moment().subtract(30, 'day').startOf('day'), moment()]
    },
    {
      name: 'Last 7 days',
      value: [moment().subtract(7, 'day').startOf('day'), moment()]
    },
    {
      name: 'This week',
      value: [moment().startOf('week').startOf('day'), moment()]
    },
    {
      name: 'Today',
      value: [moment().startOf('day'), moment()]
    },
  ];
  rangesObj: Object;

  constructor() {
    this.quarterRoman = this.getRomanNumerals(this.quarter);
    this.rangesObj = this.ranges(this.rangesArr);
  }

  /**
   * Перевод в римские числа для кварталов
   */
  getRomanNumerals(a: number): string {
    switch (a) {
      case 1:
        return 'I';
      case 2:
        return 'II';
      case 3:
        return 'III'
      case 4:
        return 'IV'
      default:
        return a.toString();
    }
  }

  /**
   * Вывод названий периодов в зависимости от выбранного значения (напр. с @value '1 апреля' по @value '24 апреля')
   */
  ranges(arr: any): any {
    let obj: { [key: string]: Array<any> } = {};
    for (let i = 0; i < arr.length; i++) {
      obj[arr[i].name] = arr[i].value;
    }
    return obj;
  }
}
