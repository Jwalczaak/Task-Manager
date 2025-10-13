import { computed, Injectable, signal } from '@angular/core';
import { ModalMode } from '../models/modal-config';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _mode = signal<ModalMode>('open');

  mode = computed(() => this._mode());

  setMode(mode: ModalMode): void {
    this._mode.set(mode);
  }
}
