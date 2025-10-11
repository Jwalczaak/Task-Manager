export type FormFieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder: string;
  min?: number;
  max?: number;
  options?: DropdownOption[];
};

export type FormSetup = {
  fieldsConfig: FormFieldConfig[];
  buttonName: string;
};

export type DropdownOption = {
  key: string;
  value: string;
};

export type FieldType = 'number' | 'text' | 'date' | 'multiselect' | 'dropdown';

export type FormMode = 'create' | 'update';

export type FormState<T> = {
  mode: 'create' | 'update';
  data: T | null;
  loading: boolean;
  error: string | null;
};

export const TASK_ADD_OR_UPDATE_CONFIG: FormSetup = {
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
  buttonName: 'Create',
};
