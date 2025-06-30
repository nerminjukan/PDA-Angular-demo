import { inject, Injectable, signal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Student } from '../interfaces';
import { AddEditStudentModalComponent } from '../modals/add-edit-student/add-edit-student-modal.component';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { STUDENTS } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  dialogService = inject(DialogService);

  public _studentsSubject = new BehaviorSubject<Student[]>([]);
  students$: Observable<Student[]> = this._studentsSubject.asObservable();

  loadingStudent = signal<boolean>(false);

  public ID_COUNTER = 55;

  students: Student[] = [];

  loadStudents() {
    this.loadingStudent.set(true);

    of(STUDENTS)
      .pipe(delay(Math.random() * 2000))
      .subscribe(students => {
        this.students = students;
        this._studentsSubject.next(students);
        this.loadingStudent.set(false);
      });
  }

  async addStudent(student: Student) {
    this._studentsSubject.next([...this._studentsSubject.value, student]);
  }

  deleteStudent(studentId: number) {
    const current = this._studentsSubject.getValue();
    this._studentsSubject.next(current.filter(s => s.id !== studentId));
  }

  updateStudent(updatedStudent: Student) {
    const students = this._studentsSubject.getValue();
    const index = students.findIndex(s => s.id === updatedStudent.id);

    if (index > -1) {
      students[index] = updatedStudent;
    } else {
      students.push(updatedStudent);
    }

    this._studentsSubject.next([...students]);
  }

  openStudentDialog(student?: Student): DynamicDialogRef {
    const ref = this.dialogService.open(AddEditStudentModalComponent, {
      header: student ? 'Edit student' : 'Add student',
      width: '30rem',
      modal: true,
      showHeader: true,
      closable: true,
      data: {
        student: student,
      },
    });
    return ref;
  }

  getStudentIdCounter(): number {
    return this.ID_COUNTER++;
  }
}
