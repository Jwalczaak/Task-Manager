import {
  Component,
  computed,
  inject,
  signal,
  Signal,
  effect,
  WritableSignal,
  EffectRef,
  Type,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TaskStoreService } from '../../shared/services/stores/task-store.service';
import { Task, TaskRequest } from '../../shared/models/task';
import { GenericFormComponent } from '../../shared/components/generic-form/generic-form.component';
import {
  FormMode,
  TASK_CREATE_CONFIG,
  TASK_UPDATE_CONFIG,
} from '../../shared/models/form';
import { GenericModalComponent } from '../../shared/components/generic-modal/generic-modal.component';
import { FormStoreService } from '../../shared/services/stores/form-store.service';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import {
  ConfigMap,
  DELETE_DIALOG_CONFIG,
} from '../../shared/models/modal-config';
import { DialogService } from '../../shared/services/dialog.service';
@Component({
  selector: 'app-dashboard',
  imports: [
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    GenericFormComponent,
    DialogComponent,
    GenericModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private taskStore = inject(TaskStoreService);
  private formStore = inject(FormStoreService);
  private dialogService = inject(DialogService);
  private mode = computed(() => this.formStore.mode());

  modalConfig = computed(() => {
    const mode = this.mode();
    const selectedTask = this.selectedTask();
    const configMap: ConfigMap = {
      create: {
        header: 'Create new task',
        component: GenericFormComponent,
        width: '900px',
        height: '600px',
        config: TASK_CREATE_CONFIG,
      },
      update: {
        header: 'Update task',
        component: GenericFormComponent,
        width: '900px',
        height: '600px',
        config: TASK_UPDATE_CONFIG,
      },
      delete: {
        header: 'Delete task',
        component: DialogComponent,
        width: '600px',
        height: '200px',
        config: {
          ...DELETE_DIALOG_CONFIG,
          messageContent: DELETE_DIALOG_CONFIG.messageContent.replace(
            '{taskTitle}',
            String(selectedTask?.title ?? '')
          ),
        },
      },
    } as const;

    return configMap[mode] ?? configMap.create;
  });

  loading: Signal<boolean> = computed(() => this.taskStore.loading());
  tasks: Signal<Task[] | undefined> = computed(() => this.taskStore.tasks());
  showForm: WritableSignal<boolean> = signal(false);
  showModal: WritableSignal<boolean> = signal(false);
  selectedTask: WritableSignal<Task | null> = signal(null);
  GenericFormComponent = GenericFormComponent;

  formEffect: EffectRef = effect(() => {
    const isSubmited = this.formStore.isSubmited();
    const formState = this.formStore.state();
    const formMode = this.formStore.mode();
    const payload: TaskRequest = formState.data;

    if (isSubmited && payload && formMode === 'create') {
      this.createTask(payload);
    } else if (isSubmited && payload && formMode === 'update') {
      const taskId = this.selectedTask()?.id;
      if (taskId) {
        this.updateTask(payload, taskId);
        this.formStore.reset();
      }
    }
  });

  dialogEffect: EffectRef = effect(() => {
    if (this.dialogService.mode() === 'cancel') {
      this.showModal.set(false);
    } else if (this.dialogService.mode() === 'accept') {
      const taskId = this.selectedTask()?.id;
      if (taskId) {
        this.deleteTask(taskId);
      }
    }
  });

  actionSuccessEffect: EffectRef = effect(() => {
    if (this.taskStore.actionSuccess()) {
      this.showModal.set(false);
      this.formStore.reset();
      this.taskStore.actionSuccess.set(false);
    }
  });

  createTask(payload: TaskRequest): void {
    this.taskStore.createTask(payload);
  }

  updateTask(payload: TaskRequest, taskId: number): void {
    this.taskStore.updateTask(payload, taskId);
  }

  deleteTask(taskId: number): void {
    this.taskStore.deleteTask(taskId);
  }

  openModal(mode: FormMode, data: Task | null): void {
    this.formStore.setMode(mode);
    this.formStore.setData(data);
    if ((mode === 'update' || mode === 'delete') && !!data) {
      this.selectedTask.set(data);
    }

    this.showModal.set(true);
  }

  onHandleCloseModal(): void {
    this.showModal.set(false);
  }

  getSeverity(status: string) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warn';

      case 'renewal':
        return null;
    }

    return null;
  }
}
