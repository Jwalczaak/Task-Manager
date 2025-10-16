import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial mode as open', () => {
    expect(service.mode()).toBe('open');
  });

  it('should update mode when setMode is called', () => {
    service.setMode('accept');
    expect(service.mode()).toBe('accept');
  });
});
