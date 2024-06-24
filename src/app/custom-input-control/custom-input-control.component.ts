import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input-control',
  templateUrl: './custom-input-control.component.html',
  styleUrls: ['./custom-input-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomInputControlComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInputControlComponent implements ControlValueAccessor {
  @ViewChild('input', { static: true }) inputElement: ElementRef | undefined;
  @Input() type: 'text' | 'number' = 'text';
  onChange = (value: string | number) => {};
  onTouched = () => {};

  writeValue(value: string | number) {
    this.inputElement!.nativeElement.value = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  onChangeHandler(event: any) {
    const value =
      this.type === 'number' ? Number(event.target.value) : event.target.value;
    this.onChange(value);
  }
}
