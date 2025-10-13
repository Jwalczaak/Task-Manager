import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskRequest } from '../../models/task';
import { rxResource } from '@angular/core/rxjs-interop';
import { of, delay, firstValueFrom, map, Observable } from 'rxjs';

import { Item } from '../../models/item';

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  private http = inject(HttpClient);

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

  assignees: Item[] = [
    { key: '1', value: 'Jan Nowak' },
    { key: '2', value: 'Wojtek Kowal' },
    { key: '3', value: 'Anna Kozak' },
    { key: '4', value: 'Joanna Stryczniewicz' },
    { key: '5', value: 'Artur Kurowski' },
  ];

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
    assigned: [this.randomItem(this.assignees)],
    progressPercentage: Math.floor(Math.random() * 101),
  }));

  private tasksSource = signal<Task[]>(this.generatedTasks);

  private readonly taskResource = rxResource({
    defaultValue: [],
    loader: () => of(this.tasksSource()).pipe(delay(1000)),
  });

  readonly tasks = this.taskResource.value.asReadonly();
  readonly loading = this.taskResource.isLoading;

  actionSuccess = signal<boolean>(false);

  async createTask(payload: TaskRequest): Promise<void> {
    const newTask = await firstValueFrom(this.postTask$(payload));
    this.tasksSource.update((tasks) => [...tasks, newTask]);
    this.taskResource.reload();
    this.actionSuccess.set(true);
  }

  async updateTask(payload: TaskRequest, taskId: number): Promise<void> {
    const updatedTask = await firstValueFrom(this.putTask$(payload, taskId));
    this.tasksSource.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    this.taskResource.reload();
    this.actionSuccess.set(true);
  }

  async deleteTask(taskId: number): Promise<void> {
    const deleteTask = await firstValueFrom(this.deleteTask$(taskId));
    console.log('hej');
    this.tasksSource.update((tasks) =>
      tasks.filter((task) => task.id !== taskId)
    );

    this.taskResource.reload();
    this.actionSuccess.set(true);
  }

  private postTask$(payload: TaskRequest): Observable<Task> {
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

  private putTask$(payload: TaskRequest, taskId: number): Observable<Task> {
    const tasks = this.tasksSource();

    const index = tasks.findIndex((t) => t.id.toString() === taskId.toString());

    const updateTask: Task = { ...tasks[index], ...payload };

    return of(updateTask).pipe(
      delay(1000),
      map((task) => this.transformTask(task))
    );
  }

  private deleteTask$(taskId: number): Observable<void> {
    return of(void 0).pipe(delay(1000));
  }

  private transformTask(task: Task) {
    return { ...task };
  }
}
