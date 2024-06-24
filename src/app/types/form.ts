export interface FormFieldData {
  type: 'text' | 'number';
  label: string;
  fieldType: string;
  options?: string[];
}

export interface FormField {
  key: string;
  fieldType: string;
}
