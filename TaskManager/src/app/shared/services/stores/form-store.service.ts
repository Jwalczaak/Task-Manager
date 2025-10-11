import { computed, Injectable, signal } from '@angular/core';
import { FormMode, FormState } from '../../models/form';

@Injectable({
  providedIn: 'root',
})
export class FormStoreService<T = any> {
  private _state = signal<FormState<T>>({
    mode: 'create',
    isSubmited: false,
    data: null,
    loading: false,
    error: null,
  });

  state = computed(() => this._state());
  mode = computed(() => this._state().mode);
  data = computed(() => this._state().data);
  loading = computed(() => this._state().loading);
  isSubmited = computed(() => this._state().isSubmited);

  setMode(mode: FormMode): void {
    this._state.update((s) => ({ ...s, mode }));
  }

  setData(data: T | null): void {
    console.log(data);
    this._state.update((s) => ({ ...s, data }));
  }

  setLoading(loading: boolean) {
    this._state.update((s) => ({ ...s, loading }));
  }

  setError(error: string | null): void {
    this._state.update((s) => ({ ...s, error }));
  }

  setSubmit(isSubmited: boolean): void {
    this._state.update((s) => ({ ...s, isSubmited }));
    console.log(this._state());
  }

  reset(): void {
    const currentMode = this._state().mode;
    this._state.set({
      mode: currentMode,
      isSubmited: false,
      data: null,
      loading: false,
      error: null,
    });
  }
}
