import { computed, Injectable, signal } from '@angular/core';
import { FormState } from '../../models/form';

@Injectable({
  providedIn: 'root',
})
export class FormStoreService<T = any> {
  private _state = signal<FormState<T>>({
    mode: 'create',
    data: null,
    loading: false,
    error: null,
  });

  state = computed(() => this._state);
  mode = computed(() => this._state().mode);
  data = computed(() => this._state().data);
  loading = computed(() => this._state().loading);
}
