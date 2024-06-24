import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormField, FormFieldData } from '../types/form';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private url = 'https://frontend-homework-mock.prod.paynt.com';

  constructor(private http: HttpClient) {}

  getFields() {
    return this.http.get<FormField[]>(`${this.url}/form`).pipe(
      map((fields) =>
        fields.map((f) =>
          f.fieldType === 'countryInput'
            ? {
                ...f,
                fieldType: 'countrySelect',
              }
            : f,
        ),
      ),
    );
  }

  getFieldsData() {
    return this.http.get<FormFieldData[]>(`${this.url}/fields`);
  }

  saveForm(body: any) {
    return this.http.post(`${this.url}/form`, body);
  }
}
