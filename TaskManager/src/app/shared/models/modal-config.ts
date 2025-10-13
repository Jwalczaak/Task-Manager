import { Type } from '@angular/core';
import { FormMode } from './form';

export type ConfigMap = Record<FormMode, ModalConfig>;

export type ModalConfig = {
  header: string;
  component: Type<any>;
  width: string;
  height: string;
  config: unknown | null;
};

export type ModalMode = 'accept' | 'cancel' | 'open';

export type DialogConfig = {
  acceptButtonName: string;
  cancelButtonName?: string;
  messageContent: string;
};

export const DELETE_DIALOG_CONFIG: DialogConfig = {
  acceptButtonName: 'Delete',
  cancelButtonName: 'Cancel',
  messageContent: 'Do you want do delete task {taskTitle}?',
};
