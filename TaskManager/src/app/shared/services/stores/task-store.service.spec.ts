import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TaskStoreService } from './task-store.service';
import { Task, TaskRequest } from '../../models/task';
import { of } from 'rxjs';

describe('TaskStoreService', () => {
  let service: TaskStoreService;
  let initialTasks: Task[] = [
    {
      id: 0,
      title: 'Design homepage',
      status: 'waiting',
      dueDate: new Date(2025, 11, 31),
      creationDate: new Date(2025, 8, 1),
      assigned: [
        { key: '1', value: 'Jan Nowak' },
        { key: '4', value: 'Joanna Stryczniewicz' },
      ],
      progressPercentage: 98,
    },
    {
      id: 1,
      title: 'Deploy app',
      status: 'in progress',
      dueDate: new Date(2025, 10, 22),
      creationDate: new Date(2024, 7, 1),
      assigned: [
        { key: '1', value: 'Jan Nowak' },
        { key: '4', value: 'Joanna Stryczniewicz' },
        { key: '5', value: 'Artur Kurowski' },
      ],
      progressPercentage: 0,
    },
    {
      id: 2,
      title: 'Code review',
      status: 'waiting',
      dueDate: new Date(2025, 10, 28),
      creationDate: new Date(2025, 3, 1),
      assigned: [{ key: '1', value: 'Jan Nowak' }],
      progressPercentage: 12,
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStoreService);

    service['tasksSource'].set(initialTasks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of tasks', fakeAsync(() => {
    tick();
    expect(service['tasksSource']()).toEqual(initialTasks);
  }));

  it('should create task and maintain immutability', fakeAsync(() => {
    const oldTasks = service['tasksSource']();

    const mockPayload: TaskRequest = {
      title: 'Immutable Task',
      status: 'to do',
      dueDate: new Date(),
      assigned: [],
      progressPercentage: 50,
    };

    const newTask: Task = { id: 3, creationDate: new Date(), ...mockPayload };

    spyOn<any>(service, 'postTask$').and.returnValue(of(newTask));

    const reloadSpy = spyOn(
      service['taskResource'],
      'reload'
    ).and.callThrough();

    service.createTask(mockPayload);
    tick();

    const newTasks = service['tasksSource']();

    expect(newTasks.length).toBe(oldTasks.length + 1);
    expect(newTasks[newTasks.length - 1]).toEqual(newTask);

    expect(newTasks).not.toBe(oldTasks);

    expect(reloadSpy).toHaveBeenCalled();
    expect(service.actionSuccess()).toBeTrue();
  }));

  it('should update task and state', fakeAsync(() => {
    const initialTasks = service['tasksSource']();
    const updateMockPayload: TaskRequest = {
      ...initialTasks[2],
      title: 'test 123',
      dueDate: new Date(2025, 10, 8),
    };

    const updatedTask: Task = {
      ...initialTasks[2],
      ...updateMockPayload,
    };

    spyOn<any>(service, 'putTask$').and.returnValue(of(updatedTask));
    const reloadSpy = spyOn(
      service['taskResource'],
      'reload'
    ).and.callThrough();
    service.updateTask(updateMockPayload, initialTasks[2].id);
    tick();
    const newTasks = service['tasksSource']();
    expect(newTasks.length).toBe(3);
    expect(newTasks[2]).toEqual(updatedTask);
    expect(reloadSpy).toHaveBeenCalled();
    expect(service.actionSuccess()).toBeTrue();
  }));

  it('should delete task and update state', fakeAsync(() => {
    spyOn<any>(service, 'deleteTask$').and.returnValue(of(void 0));

    service.deleteTask(1);
    tick();

    expect(service['tasksSource']().length).toBe(2);
    expect(service['tasksSource']()[1].id).toBe(2);
    expect(service.actionSuccess()).toBeTrue();
  }));

  it('should not update any task if ID does not exist', fakeAsync(() => {
    const oldTasks = service['tasksSource']();
    service.updateTask({ title: 'X' } as TaskRequest, 999);
    tick();
    const newTasks = service['tasksSource']();

    expect(newTasks).toEqual(oldTasks);
  }));
});
