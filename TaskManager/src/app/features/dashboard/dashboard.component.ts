import { Component, computed, inject, OnInit, Signal } from '@angular/core';
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
import { TaskStoreService } from '../../shared/services/task-store.service';
import { Task } from '../../shared/models/task';
@Component({
  selector: 'app-dashboard',
  imports: [
    ButtonModule,
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,

    CommonModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private taskStore = inject(TaskStoreService);
  loading: Signal<boolean> = computed(() =>
    this.taskStore.tasksResource.isLoading()
  );
  tasks: Signal<Task[] | undefined> = computed(() =>
    this.taskStore.tasksResource.value()
  );

  ngOnInit(): void {}

  clear(table: any) {
    table.clear();
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
