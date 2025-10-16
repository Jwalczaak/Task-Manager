import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

import { DialogConfig } from '../../models/modal-config';
import { DebugElement } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { By } from '@angular/platform-browser';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let expectedDialogConfig: DialogConfig;

  const dialogServiceMock = jasmine.createSpyObj('DialogService', ['setMode']);

  const getMessage = (): string =>
    fixture.debugElement
      .query(By.css('.content-message'))
      .nativeElement.textContent.trim();

  const getAcceptButton = () =>
    fixture.debugElement.query(By.css('.button-accept')).nativeElement;

  const getCancelButton = (): HTMLElement | null => {
    const btn = fixture.debugElement.query(By.css('.button-cancel'));
    return btn?.nativeElement ?? null;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogComponent],
      providers: [{ provide: DialogService, useValue: dialogServiceMock }],
    });
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;

    expectedDialogConfig = {
      acceptButtonName: 'Delete',
      cancelButtonName: 'Cancel',
      messageContent: 'Do you want do delete task Update data?',
    };

    fixture.componentRef.setInput('config', expectedDialogConfig);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct message content', () => {
    expect(getMessage()).toBe('Do you want do delete task Update data?');
  });

  describe('DialogComponent - buttons scenerios', () => {
    it('should display the correct cancel button name when name exist', () => {
      fixture.componentRef.setInput('config', {
        ...expectedDialogConfig,
        cancelButtonName: 'Cancel',
      });

      fixture.detectChanges();

      const buttonCancelDe = fixture.debugElement.query(
        By.css('.button-cancel')
      );
      const buttonCancelEl: HTMLElement = buttonCancelDe.nativeElement;

      expect(buttonCancelEl.textContent?.trim()).toBe('Cancel');
    });

    it('should not render the cancel button when name does not exist', () => {
      fixture.componentRef.setInput('config', {
        ...expectedDialogConfig,
        cancelButtonName: undefined,
      });

      fixture.detectChanges();

      expect(getCancelButton()).toBeNull();
    });

    it('should not render the cancel button when cancelButtonName is undefined', () => {
      fixture.componentRef.setInput('config', {
        ...expectedDialogConfig,
        cancelButtonName: undefined,
      });
      fixture.detectChanges();

      expect(getCancelButton()).toBeNull();
    });

    it('should display the accept button', () => {
      expect(getAcceptButton().textContent.trim()).toBe('Delete');
    });
  });

  describe('DialogComponent - button clicks', () => {
    it('should call dialogService.setMethod("accept") when accept button is clicked', () => {
      const buttonAcceptDe = fixture.debugElement.query(
        By.css('.button-accept')
      );

      buttonAcceptDe.triggerEventHandler('click', null);

      expect(dialogServiceMock.setMode).toHaveBeenCalledWith('accept');
    });

    it('should call dialogService.setMethod("cancel") when accept button is clicked', () => {
      fixture.componentRef.setInput('config', {
        ...expectedDialogConfig,
        cancelButtonName: 'Cancel',
      });

      fixture.detectChanges();

      const buttonCancelDe = fixture.debugElement.query(
        By.css('.button-cancel')
      );

      buttonCancelDe.triggerEventHandler('click', null);

      expect(dialogServiceMock.setMode).toHaveBeenCalledWith('cancel');
    });
  });
});
