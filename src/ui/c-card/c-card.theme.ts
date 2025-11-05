import { defineThemes } from '../theme/theme.models';

export const { useTheme } = defineThemes({
  dark: {
    backgroundColor: 'var(--surface-elev-1)',
    borderColor: 'var(--surface-border)',
  },
  light: {
    backgroundColor: 'var(--surface-card)',
    borderColor: 'var(--surface-border)',
  },
});
