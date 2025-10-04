import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { rxResource } from '@angular/core/rxjs-interop';
import { of, delay } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  constructor(private http: HttpClient) {}

  // Some sample data to pick from
  titles = [
    'Design homepage',
    'Setup database',
    'Implement authentication',
    'Create API endpoints',
    'Write unit tests',
    'Fix bugs',
    'Deploy app',
    'Update documentation',
    'Optimize performance',
    'Code review',
  ];

  assignees = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace'];

  statuses: Task['status'][] = ['Pending', 'In Progress', 'Completed'];

  randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  tasks: Task[] = Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    title: this.randomItem(this.titles),
    status: this.randomItem(this.statuses),
    dueDate: this.randomDate(new Date(2025, 0, 1), new Date(2025, 11, 31)),
    CreationDate: this.randomDate(new Date(2025, 0, 1), new Date(2025, 11, 31)),
    assigned: this.randomItem(this.assignees),
    progressPercentage: Math.floor(Math.random() * 101),
  }));

  tasksResource = rxResource({
    loader: () => of(this.tasks).pipe(delay(1000)),
  });
}
