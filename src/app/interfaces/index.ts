import { MenuItemCommandEvent } from 'primeng/api';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Male' | 'Female' | string;
  dateOfBirth: string | Date;
  grade: number;
  major: string;
  enrollmentDate: string | Date;
  isActive: boolean;
  courses: Course[];
}

export interface Course {
  id: number;
  name: string;
  grade: number;
  completed: boolean;
}

export interface ActionItem {
  label: string;
  icon: string;
  command: (e: MenuItemCommandEvent) => void;
  tooltip: string;
}
