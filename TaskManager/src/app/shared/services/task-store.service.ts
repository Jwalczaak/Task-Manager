import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Task, TaskRequest } from '../models/task';
import { rxResource } from '@angular/core/rxjs-interop';
import { of, delay, firstValueFrom, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  constructor(private http: HttpClient) {}

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

  statuses: Task['status'][] = [
    'to do',
    'in progress',
    'waiting',
    'blocked',
    'done',
  ];

  randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  generatedTasks: Task[] = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    title: this.randomItem(this.titles),
    status: this.randomItem(this.statuses),
    dueDate: this.randomDate(new Date(2025, 0, 1), new Date(2025, 11, 31)),
    CreationDate: this.randomDate(new Date(2025, 0, 1), new Date(2025, 11, 31)),
    assigned: this.randomItem(this.assignees),
    progressPercentage: Math.floor(Math.random() * 101),
  }));

  private tasksSource = signal<Task[]>(this.generatedTasks);

  private readonly taskResource = rxResource({
    defaultValue: [],
    loader: () => of(this.tasksSource()).pipe(delay(1000)),
  });

  readonly tasks = this.taskResource.value.asReadonly();
  readonly loading = this.taskResource.isLoading;

  async createTask(payload: TaskRequest) {
    const newTask = await firstValueFrom(this.postTask$(payload));
    console.log(newTask);
    this.tasksSource.update((tasks) => [...tasks, newTask]);
    console.log(this.tasksSource());
    this.taskResource.reload();
  }

  private postTask$(payload: TaskRequest) {
    const newCat: Task = {
      id: this.tasks.length + 1,
      CreationDate: new Date(),
      ...payload,
    };
    return of(newCat).pipe(
      delay(1000),
      map((task) => this.transformTask(task))
    );
  }

  private transformTask(task: Task) {
    return { ...task };
  }
}
