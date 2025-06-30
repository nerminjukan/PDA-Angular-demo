import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Student, ActionItem } from '../../interfaces';
import { ConfirmationService, MenuItemCommandEvent } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Subscription } from 'rxjs';
import { StudentService } from '../../services/students.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  standalone: false,
})
export class OverviewComponent implements OnInit, OnDestroy {
  private _confirmationService = inject(ConfirmationService);
  private _studentService = inject(StudentService);
  private _dialogService = inject(DialogService);

  students: Student[] = [];
  expandedRows = {};
  loading = this._studentService.loadingStudent;
  actionsList: ActionItem[] = [];

  visibleAddEditDialog: boolean = false;

  private subscription = new Subscription();

  ngOnInit(): void {
    this._studentService.loadStudents();

    this.subscription.add(
      this._studentService.students$.subscribe(students => {
        if (students.length > 0) {
          this.students = students;
        }
      })
    );
  }

  getActiveStatus(status: boolean) {
    return status ? 'success' : 'warn';
  }

  openMenu(event: Event, student: Student, menu: Menu) {
    this.actionsList = [
      {
        label: 'EDIT',
        icon: 'pi pi-pencil',
        command: (e: MenuItemCommandEvent) => this.editStudent(student, e),
        tooltip: 'Edit the user',
      },
      {
        label: 'DELETE',
        icon: 'pi pi-trash',
        command: (e: MenuItemCommandEvent) => this.deleteStudent(student, e),
        tooltip: 'Delete the user',
      },
    ];

    menu.toggle(event);
  }

  editStudent(student: Student, event: MenuItemCommandEvent) {
    const res = this._studentService.openStudentDialog(student);
  }

  deleteStudent(student: Student, event: MenuItemCommandEvent) {
    this._confirmationService.confirm({
      target: (event as MenuItemCommandEvent).originalEvent!.target!,
      message: `Are you sure that you want to delete student ${student.firstName} ${student.lastName}?`,
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
      },
      accept: () => {
        this._studentService.deleteStudent(student.id);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
