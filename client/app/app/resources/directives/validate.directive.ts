import {Directive, ElementRef} from '@angular/core';
import {NgControl} from '@angular/forms';
import {NgbTooltip, NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {ValidateService} from "../services/validate.service";

@Directive({
  selector: '[appValidate]',
  host: {
    '(blur)': 'onBlur($event)',
    '(ngModelChange)': 'onNgModelChange($event)',
    '(ngSubmit)': 'onSubmit($event)'
  },
  providers: [NgbTooltip, NgbTooltipConfig]
})
export class ValidateDirective {
  action: boolean = false;

  constructor(private _elementRef: ElementRef,
              private _control: NgControl,
              private _tooltip: NgbTooltip,
              private _validate: ValidateService,) {

    if (!this._elementRef.nativeElement.hasAttribute('tooltip-border')) {
      this._elementRef.nativeElement.setAttribute('tooltip-border', 'danger')
    }
    if (!this._elementRef.nativeElement.hasAttribute('placement')) {
      this._tooltip.placement = 'right';
    }
    if (!this._elementRef.nativeElement.hasAttribute('triggers')) {
      this._tooltip.triggers = 'manual';
    }
    this._control['_parent']['ngSubmit'].subscribe((status) => {
      this.checkInvalid();
    });
  }

  onNgModelChange($event) {
    if (this.action) {
      this._tooltip.close();
    }


  }

  onBlur($event) {
    this.checkInvalid();
  }

  checkInvalid() {
    if (this._control.invalid) {
      let key = Object.keys(this._control['errors'])[0];
      switch (key) {
        case 'required':
          this._tooltip.ngbTooltip = this._validate.getErrorMessage.required();
          break;
        case 'pattern':
          let regexp = this._control['errors'][key]['requiredPattern'];
          this._tooltip.ngbTooltip = this._validate.getErrorMessage.pattern(regexp);
          break;
        case 'minlength':
          let min = this._control['errors'][key]['requiredLength'];
          this._tooltip.ngbTooltip = this._validate.getErrorMessage.minlength(min);
          break;
        case 'maxlength':
          let max = this._control['errors'][key]['requiredLength'];
          this._tooltip.ngbTooltip = this._validate.getErrorMessage.maxlength(max);
          break;
        default:
          this._tooltip.ngbTooltip = 'Неизвестная ошибка';
          break;
      }
      this._tooltip.open();
      this.action = true;
    }
  }
}
