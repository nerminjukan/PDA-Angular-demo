import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { CustomThemePreset } from './themes/custom-theme';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DialogService } from 'primeng/dynamicdialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: CustomThemePreset,
        options: {
          darkModeSelector: '.app-dark-mode',
        },
      },
    }),
    provideAnimations(),
    DialogService,
  ],
};
