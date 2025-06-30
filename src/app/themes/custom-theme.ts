import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';

export const CustomThemePreset = definePreset(Material, {
  primitive: {
    purpleish: {
      50: '#f6f5f6',
      100: '#e8ddea',
      200: '#d7bdd8',
      300: '#cba9c8',
      400: '#c4a1bd',
      500: '#b091ad',
      600: '#9c819d',
      700: '#6c5d6c',
      800: '#594859',
      900: '#3b2f3b',
      950: '#231723',
    },
  },
  semantic: {
    primary: {
      50: '{purpleish.50}',
      100: '{purpleish.100}',
      200: '{purpleish.200}',
      300: '{purpleish.300}',
      400: '{purpleish.400}',
      500: '{purpleish.500}',
      600: '{purpleish.600}',
      700: '{purpleish.700}',
      800: '{purpleish.800}',
      900: '{purpleish.900}',
      950: '{purpleish.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.800}',
          inverseColor: '#ffffff',
          hoverColor: '{primary.900}',
          activeColor: '{primary.800}',
        },
        highlight: {
          background: '{primary.950}',
          focusBackground: '{primary.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
        mask: {
          background: 'rgba(0, 0, 0, 0.33)',
        },
        overlay: {
          modal: {
            shadow: 'none',
          },
        },
      },
      dark: {
        primary: {
          color: '{primary.50}',
          inverseColor: '{primary.950}',
          hoverColor: '{primary.100}',
          activeColor: '{primary.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
        button: {
          primary: {
            hover: {
              background: '{primary.900}',
            },
          },
        },
        mask: {
          background: 'rgba(0, 0, 0, 0.33)',
        },
        overlay: {
          modal: {
            shadow: 'none',
          },
        },
      },
    },
  },
  components: {
    datatable: {
      colorScheme: {
        light: {
          headerCell: {
            background: '{primary.800}',
            color: '{primary.100}',
            selected: {
              background: '{primary.300}',
            },
          },
          row: {
            hoverBackground: '{primary.300}',
            color: '{primary.900}',
            background: '{primary.50}',
            stripedBackground: '{surface.100}',
          },
        },
        dark: {
          headerCell: {
            background: '{primary.800}',
            color: '{primary.100}',
          },
          row: {
            hoverBackground: '{primary.600}',
            color: '{primary.900}',
            background: '{primary.100}',
            stripedBackground: '{neutral.50}',
          },
        },
      },
    },
    tag: {
      fontSize: '10px',
      colorScheme: {
        dark: {
          warn: {
            color: '{primary.50}',
          },
          success: {
            color: '{primary.50}',
          },
        },
        light: {
          warn: {
            color: '{primary.50}',
          },
          success: {
            color: '{primary.50}',
          },
        },
      },
    },
    select: {
      background: 'none',
      colorScheme: {
        dark: {
          borderColor: '{surface.200}',
        },
        light: {
          borderColor: '{surface.600}',
        },
      },
    },
    multiselect: {
      background: 'none',
      colorScheme: {
        dark: {
          borderColor: '{surface.200}',
        },
        light: {
          borderColor: '{surface.600}',
        },
      },
    },
    datepicker: {
      background: 'none',
      colorScheme: {
        dark: {
          panel: {
            borderColor: '{surface.200}',
          },
        },
        light: {
          panel: {
            borderColor: '{surface.200}',
          },
        },
      },
    },
    inputtext: {
      colorScheme: {
        dark: {
          borderColor: '{surface.200}',
        },
        light: {
          borderColor: '{surface.200}',
        },
      },
    },
    skeleton: {
      colorScheme: {
        dark: {
          animationBackground: '{primary.500}',
        },
        light: {
          animationBackground: '{primary.500}',
        },
      },
    },
    dialog: {
      borderRadius: '8px',
    },
  },
});
