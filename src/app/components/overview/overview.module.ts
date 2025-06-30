import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditStudentModalComponent } from '../../modals/add-edit-student/add-edit-student-modal.component';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogService } from 'primeng/dynamicdialog';
import { StudentService } from '../../services/students.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';

@NgModule({
  declarations: [OverviewComponent, AddEditStudentModalComponent],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    ButtonModule,
    TableModule,
    CardModule,
    TagModule,
    MenuModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    DatePipe,
    InputTextModule,
    FormsModule,
    SkeletonModule,
    DynamicDialogModule,
    MultiSelectModule,
    DialogModule,
    RadioButtonModule,
    DatePickerModule,
    SelectModule,
    ReactiveFormsModule,
  ],
  providers: [ConfirmationService],
})
export class OverviewModule {}
