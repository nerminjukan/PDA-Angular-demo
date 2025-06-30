import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/students.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-header',
  imports: [
    MenuModule,
    ButtonModule,
    AvatarModule,
    TagModule,
    SelectModule,
    FormsModule,
    DialogModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [DialogService],
})
export class HeaderComponent implements OnInit {
  private _studentService = inject(StudentService);

  darkMode: boolean = true;

  items = [
    {
      label: 'ADD STUDENT',
      icon: 'pi pi-user-plus',
      command: () => this.addStudent(),
      tooltip: 'Add another user',
    },
    {
      label: this.darkMode ? 'LIGHT MODE' : 'DARK MODE',
      icon: 'pi ' + (this.darkMode ? 'pi-circle-off' : 'pi-circle-on'),
      command: () => this.toggleDarkMode(),
      tooltip: 'Switch color mode',
    },
  ];

  timezones = ['My timezone (GMT +1)', 'Random 1 (GMT +2)', 'Random 2 (GMT +3)'];

  selectedTimezone = 'My timezone (GMT +1)';

  universities = ['Ljubljana', 'Maribor', 'Novo mesto'];

  selectedUniversity = 'Ljubljana';

  customMenu = {
    colorScheme: {
      light: {
        primary: {
          color: '{primary.100}',
          background: '{primary.800}',
          borderColor: '{primary.800}',
        },
      },
      dark: {
        primary: {
          color: '{primary.950}',
        },
      },
    },
  };

  ngOnInit(): void {
    this.updateItems();
  }

  addStudent() {
    this._studentService.openStudentDialog();
  }

  toggleDarkMode() {
    const element = document.querySelector('html')!;
    element.classList.toggle('app-dark-mode');
    this.darkMode = !this.darkMode;
    this.updateItems();
  }

  updateItems() {
    this.items = [
      {
        label: 'ADD STUDENT',
        icon: 'pi pi-user-plus',
        command: () => this.addStudent(),
        tooltip: 'Add another user',
      },
      {
        label: this.darkMode ? 'LIGHT MODE' : 'DARK MODE',
        icon: 'pi ' + (this.darkMode ? 'pi-circle-off' : 'pi-circle-on'),
        command: () => this.toggleDarkMode(),
        tooltip: 'Switch color mode',
      },
    ];
  }
}
