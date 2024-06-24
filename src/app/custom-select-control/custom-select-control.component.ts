import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select-control',
  templateUrl: './custom-select-control.component.html',
  styleUrls: ['./custom-select-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomSelectControlComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectControlComponent implements ControlValueAccessor {
  @ViewChild('select', { static: true }) selectElement: ElementRef | undefined;
  @Input() options: string[] = [];

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string) {
    this.selectElement!.nativeElement.value = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}
