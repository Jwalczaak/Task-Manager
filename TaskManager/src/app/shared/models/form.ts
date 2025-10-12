import { Item } from './item';

export type FormFieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder: string;
  min?: number;
  max?: number;
  options?: Item[];
};

export type FormSetup = {
  fieldsConfig: FormFieldConfig[];
  buttonName: string;
};

export type FieldType = 'number' | 'text' | 'date' | 'multiselect' | 'dropdown';

export type FormMode = 'create' | 'update' | 'delete';

export type FormState<T> = {
  mode: FormMode;
  isSubmited: boolean;
  data: T | null;
  loading: boolean;
  error: string | null;
};

const BASE_TASK_CONFIG: Omit<FormSetup, 'buttonName'> = {
  fieldsConfig: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      placeholder: 'Provide name',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'dropdown',
      required: true,
      placeholder: 'Select status',
      options: [
        { key: '1', value: 'to do' },
        { key: '2', value: 'in progress' },
        { key: '3', value: 'waiting' },
        { key: '4', value: 'blocked' },
        { key: '5', value: 'done' },
      ],
    },
    {
      name: 'dueDate',
      label: 'Due Date',
      type: 'date',
      required: true,
      placeholder: 'Select a date',
    },
    {
      name: 'assigned',
      label: 'Assigned',
      type: 'multiselect',
      required: false,
      placeholder: 'Select assigned',
      options: [
        { key: '1', value: 'Jan Nowak' },
        { key: '2', value: 'Wojtek Kowal' },
        { key: '3', value: 'Anna Kozak' },
        { key: '4', value: 'Joanna Stryczniewicz' },
        { key: '5', value: 'Artur Kurowski' },
      ],
    },

    {
      name: 'progressPercentage',
      label: 'Progress',
      type: 'number',
      required: false,
      placeholder: 'Mark progress',
      min: 0,
      max: 100,
    },
  ],
};

export const TASK_CREATE_CONFIG: FormSetup = {
  ...BASE_TASK_CONFIG,
  buttonName: 'Create',
};

export const TASK_UPDATE_CONFIG: FormSetup = {
  ...BASE_TASK_CONFIG,
  buttonName: 'Update',
};
