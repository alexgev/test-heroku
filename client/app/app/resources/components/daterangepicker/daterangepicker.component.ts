import {Component, EventEmitter} from '@angular/core'
import * as moment from 'moment';
import {DaterangepickerConfig} from 'ng2-daterangepicker';
import {DaterangepickerService} from './daterangepicker.service';

@Component({
  selector: 'daterangepicker',
  templateUrl: './daterangepicker.component.html',
  outputs: ['setDate'],
  inputs: ['type'],
  providers: [DaterangepickerConfig]
})
export class DaterangepickerComponent {
  public type: string;
  public mainInput = {
    startDate: moment().subtract(30, 'days'),
    endDate: moment()
  };
  public setDate = new EventEmitter();

  constructor(private daterangepickerOptions: DaterangepickerConfig) {
    const daterangepicker = new DaterangepickerService();
    this.daterangepickerOptions.skipCSS = true;
    this.daterangepickerOptions.settings = {
      parentEl: "main",
      startDate: this.mainInput.startDate.format('YYYY-MM-DD'),
      endDate: this.mainInput.endDate.format('YYYY-MM-DD'),
      locale: {
        format: 'YYYY-MM-DD',
        customRangeLabel: "Custom",
      },
      applyClass: "btn-secondary",
      alwaysShowCalendars: true,
      showCustomRangeLabel: true,
      buttonClasses: "btn btn-sm btn-block",
      opens: "left",
      ranges: daterangepicker.rangesObj,
    };
  }

  public selectedDate(value: any, dateInput: any) {
    dateInput.startDate = value.start;
    dateInput.endDate = value.end;
  }

  ngOnInit() {
    this.setDate.emit(this.mainInput);
  }

  public onSetDate(e: any) {
    this.setDate.emit(e.picker);
  }
}
