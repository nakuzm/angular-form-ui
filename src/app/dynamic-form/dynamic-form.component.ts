import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { FormService } from '../services/form.service';
import { FormField, FormFieldData } from '../types/form';

type DynamicFormField = FormField & FormFieldData;

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnDestroy {
  destroy$ = new Subject<void>();
  dynamicForm: FormGroup;
  fields$: Observable<DynamicFormField[]>;
  formState$ = new Subject<null | {
    isError?: boolean;
    isSuccess?: boolean;
    isLoading?: boolean;
  }>();

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
  ) {
    this.dynamicForm = this.formBuilder.group({});
    this.dynamicForm.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.formState$.next(null);
      });
    this.fields$ = combineLatest([
      this.formService.getFields(),
      this.formService.getFieldsData(),
    ]).pipe(
      map(([formFields, fieldsData]) => {
        const controls: DynamicFormField[] = [];
        const fieldsDataMap = fieldsData.reduce(
          (acc, field) => {
            acc[field.fieldType] = field;
            return acc;
          },
          {} as Record<string, FormFieldData>,
        );
        formFields.forEach(({ key, fieldType }) => {
          this.addFormControl(key);
          controls.push({
            key,
            ...fieldsDataMap[fieldType],
          });
        });
        return controls;
      }),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  addFormControl(fieldName: string, validators: any[] = []) {
    this.dynamicForm.addControl(
      fieldName,
      this.formBuilder.control('', validators),
    );
  }

  onSubmit() {
    this.formState$.next({
      isLoading: true,
    });
    const formValues = this.dynamicForm.value;
    this.formService.saveForm(formValues).subscribe({
      next: () => {
        this.formState$.next({
          isSuccess: true,
        });
      },
      error: () => {
        this.formState$.next({
          isError: true,
        });
      },
    });
  }
}
