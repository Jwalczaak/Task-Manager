export type FormFieldConfig = {
  name: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
};

export type FieldType = 'number' | 'text' | 'date' | 'dropdown';

export const TASK_ADD_OR_UPDATE_CONFIG: FormFieldConfig[] = [
  { name: 'name', type: 'text', required: true, placeholder: 'Provide name' },
  {
    name: 'status',
    type: 'dropdown',
    required: true,
    placeholder: 'Select status',
  },
  {
    name: 'Due date',
    type: 'date',
    required: true,
    placeholder: 'Select a date',
  },
  {
    name: 'assigned',
    type: 'dropdown',
    required: false,
    placeholder: 'Select assigned',
  },

  {
    name: 'progress',
    type: 'number',
    required: false,
    placeholder: 'Mark progress',
    min: 0,
    max: 100,
  },
];
