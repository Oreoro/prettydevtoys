import { defineThemes } from '../theme/theme.models';

export const { useTheme } = defineThemes({
  dark: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: 'rgba(19, 80, 88, 0.4)',

    focus: {
      backgroundColor: 'rgba(19, 80, 88, 0.08)',
      borderColor: '#135058',
    },
  },
  light: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: 'rgba(19, 80, 88, 0.4)',

    focus: {
      backgroundColor: 'rgba(19, 80, 88, 0.06)',
      borderColor: '#135058',
    },
  },
});
