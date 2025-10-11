import { Item } from './item';

export type Task = {
  id: number;
  title: string;
  status: statuses;
  dueDate: Date;
  CreationDate: Date;
  assigned: Item[];
  progressPercentage: number;
};

export interface TaskRequest {
  title: string;
  status: statuses;
  dueDate: Date;
  assigned: Item[];
  progressPercentage: number;
}

export type statuses = 'to do' | 'in progress' | 'waiting' | 'blocked' | 'done';
