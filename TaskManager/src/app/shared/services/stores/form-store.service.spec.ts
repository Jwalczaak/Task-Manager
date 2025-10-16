import { TestBed } from '@angular/core/testing';

import { FormStoreService } from './form-store.service';
import { Task } from '../../models/task';
import { FormState } from '../../models/form';

describe('FormStoreService', () => {
  let service: FormStoreService;
  let taskMock: Task = {
    id: 0,
    title: 'Design homepage',
    status: 'waiting',
    dueDate: new Date(2025, 11, 31),
    creationDate: new Date(2025, 0, 1),
    assigned: [{ key: '1', value: 'Jan Nowak' }],
    progressPercentage: 12,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial state as "create" isSubmited and loading set as false and data,error set as null ', () => {
    expect(service.state().mode).toBe('create');
    expect(service.state().data).toBeNull();
    expect(service.state().isSubmited).toBeFalse();
    expect(service.state().loading).toBeFalse();
    expect(service.state().error).toBeNull();
  });

  it('should have initial mode() as "create"', () => {
    expect(service.mode()).toBe('create');
  });

  it('should have initial data() as null', () => {
    expect(service.data()).toBeNull();
  });

  it('should have initial loading() as false ', () => {
    expect(service.loading()).toBeFalse();
  });

  it('should have initial initial isSubmit() as false', () => {
    expect(service.isSubmited()).toBeFalse();
  });

  it('should have initial isError() as false', () => {
    expect(service.error()).toBeNull();
  });

  it('should update setMode to "update"', () => {
    service.setMode('update');
    expect(service.mode()).toBe('update');
  });

  it('Should update setData with mockTask ', () => {
    service.setData(taskMock);

    expect(service.data()).toEqual(taskMock);
  });

  it('Should update setLoading with true', () => {
    service.setLoading(true);

    expect(service.loading()).toEqual(true);
  });

  it('should set error message correctly', () => {
    service.setError('Something went wrong');
    expect(service.error()).toBe('Something went wrong');
  });

  it('should update setSubmit with true', () => {
    service.setSubmit(true);
    expect(service.isSubmited()).toBe(true);
  });

  it('should reset form store', () => {
    service.setMode('update');
    service.setData(taskMock);
    service.setLoading(true);
    service.setError('example error');
    service.setSubmit(true);

    const defultTaskMock: FormState<any> = {
      mode: 'update',
      isSubmited: false,
      data: null,
      loading: false,
      error: null,
    };

    expect(service.state()).toEqual({
      mode: 'update',
      isSubmited: true,
      data: taskMock,
      loading: true,
      error: 'example error',
    });

    service.reset();

    expect(service.state()).toEqual(defultTaskMock);
  });

  it('should not mutate previous state object', () => {
    const prevState = service.state();
    service.setMode('update');
    expect(service.state()).not.toBe(prevState);
  });
});
