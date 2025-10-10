import { computed, Injectable, signal } from '@angular/core';
import { FormMode, FormState } from '../../models/form';

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

  state = computed(() => this._state());
  mode = computed(() => this._state().mode);
  data = computed(() => this._state().data);
  loading = computed(() => this._state().loading);

  setMode(mode: FormMode): void {
    this._state.update((s) => ({ ...s, mode }));
  }

  setData(data: T | null): void {
    this._state.update((s) => ({ ...s, data }));
  }

  setLoading(loading: boolean) {
    this._state.update((s) => ({ ...s, loading }));
  }

  setError(error: string | null): void {
    this._state.update((s) => ({ ...s, error }));
  }

  reset(): void {
    const currentMode = this._state().mode;
    this._state.set({
      mode: currentMode,
      data: null,
      loading: false,
      error: null,
    });
  }
}
