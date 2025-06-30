import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Course, Student } from '../../interfaces';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NEW_STUDENT, COLLEGE_MAJORS, COLLEGE_COURSES } from '../../../constants';
import { StudentService } from '../../services/students.service';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './add-edit-student-modal.component.html',
  styleUrl: './add-edit-student-modal.component.scss',
  standalone: false,
})
export class AddEditStudentModalComponent implements OnInit {
  public ref = inject(DynamicDialogRef);
  public config = inject(DynamicDialogConfig<{ student: Student }>);
  private _studentService = inject(StudentService);

  @Input() student: Partial<Student> = {};

  editable = signal(true);
  collegeCourses = COLLEGE_COURSES;
  collegeMajors = COLLEGE_MAJORS;
  selectedCourses: { name: string; id: number }[] = [];
  mode: 'new' | 'update' = 'new';

  studentForm: FormGroup | null = null;

  ngOnInit(): void {
    this.mode = this.config.data?.student ? 'update' : 'new';
    this.student = this.config.data?.student
      ? { ...this.config.data?.student }
      : { ...NEW_STUDENT, id: this._studentService.getStudentIdCounter() };

    this.student.dateOfBirth = this.student.dateOfBirth
      ? new Date(this.student.dateOfBirth)
      : this.getRandomPastDate();
    this.student.enrollmentDate = this.student.enrollmentDate
      ? new Date(this.student.enrollmentDate)
      : new Date();

    this.editable.set(this.config.data?.student ? false : true);

    this.selectedCourses = this.mapSelectedStudentCourses(this.student);

    const isDisabled = !this.editable();

    this.studentForm = new FormGroup({
      firstName: new FormControl({ value: this.student.firstName || '', disabled: isDisabled }, [
        Validators.required,
      ]),
      lastName: new FormControl({ value: this.student.lastName || '', disabled: isDisabled }, [
        Validators.required,
      ]),
      email: new FormControl({ value: this.student.email || '', disabled: isDisabled }, [
        Validators.required,
        Validators.email,
      ]),
      dateOfBirth: new FormControl(
        { value: this.student.dateOfBirth || null, disabled: isDisabled },
        [Validators.required]
      ),
      grade: new FormControl({ value: this.student.grade || 0, disabled: isDisabled }, [
        Validators.required,
        Validators.min(0),
        Validators.max(12),
      ]),
      major: new FormControl({ value: this.student.major || '', disabled: false }, [
        Validators.required,
      ]),
      enrollmentDate: new FormControl(
        { value: this.student.enrollmentDate || null, disabled: isDisabled },
        [Validators.required]
      ),
      isActive: new FormControl({ value: !!this.student.isActive, disabled: isDisabled }),
      courses: new FormControl({ value: this.selectedCourses || [], disabled: false }),
    });
  }

  closeDialog() {
    this.ref.close();
  }

  get coursesControl(): FormControl {
    return this.studentForm?.get('courses') as FormControl;
  }

  save() {
    this.student.courses = this.studentForm?.controls['courses'].value.map(
      (el: { name: string; id: number }) => {
        return {
          ...el,
          grade: this.student.courses?.find(course => course.id === el.id)?.grade || 0,
          completed: false,
        };
      }
    );

    const student: Student = {
      ...this.studentForm?.getRawValue(),
      courses: this.student.courses,
      id: this.mode === 'new' ? this._studentService.getStudentIdCounter() : this.student.id,
    };

    this.mode === 'new'
      ? this._studentService.addStudent(student)
      : this._studentService.updateStudent(student);
    this.ref.close();
  }

  getRandomPastDate(minYearsAgo = 15): Date {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - minYearsAgo, today.getMonth(), today.getDate());

    const earliest = new Date(today.getFullYear() - 50, 0, 1).getTime();
    const latest = maxDate.getTime();

    const randomTimestamp = Math.floor(Math.random() * (latest - earliest)) + earliest;
    return new Date(randomTimestamp);
  }

  mapSelectedStudentCourses(student: Partial<Student>): { name: string; id: number }[] {
    return (
      student.courses?.map(el => {
        return { name: el.name, id: COLLEGE_COURSES.find(e => e.name === el.name)!.id };
      }) || []
    );
  }
}
