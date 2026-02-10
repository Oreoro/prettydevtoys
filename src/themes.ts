import type { GlobalThemeOverrides } from 'naive-ui';

function cssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') {
    return fallback;
  }
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function createPalette() {
  // Hex Beautiful Jewel-Tone Color Palette
  const accent = cssVar('--hex-amethyst', '#a477b2'); // Amethyst - primary purple
  const success = cssVar('--hex-jade', '#5cb198'); // Jade - teal green
  const warning = cssVar('--hex-citrine', '#cda849'); // Citrine - golden yellow
  const danger = cssVar('--hex-rose-quartz', '#f5c0c0'); // Rose Quartz - soft pink
  const text = cssVar('--hex-obsidian', '#14141c'); // Obsidian - deep dark
  const textSoft = cssVar('--hex-cement', '#717a94'); // Cement - blue-gray
  const textMuted = cssVar('--color-text-muted', 'rgba(113, 122, 148, 0.7)'); // Cement muted
  const surface = cssVar('--hex-opal', '#fbf9f9'); // Opal - off-white
  const surfaceAlt = cssVar('--color-surface-alt', 'rgba(251, 249, 249, 0.6)');
  const border = cssVar('--hex-cement', 'rgba(113, 122, 148, 0.25)'); // Cement with opacity

  return {
    primary: accent,
    primaryHover: cssVar('--hex-sugilite', '#5f509d'), // Sugilite - deep purple
    primaryPressed: cssVar('--color-primary-active', 'rgba(95, 80, 157, 0.9)'),
    accent,
    success,
    warning,
    error: danger,
    surface,
    surfaceAlt,
    border,
    text,
    textSoft,
    textMuted,
  };
}

export function createLightThemeOverrides(): GlobalThemeOverrides {
  const p = createPalette();
  return {
    common: {
      primaryColor: p.primary,
      primaryColorHover: p.primaryHover,
      primaryColorPressed: p.primaryPressed,
      primaryColorSuppl: p.accent,
      infoColor: p.primary,
      successColor: p.success,
      warningColor: p.warning,
      errorColor: p.error,
      borderRadius: '14px',
      borderColor: p.border,
      textColor1: p.text,
      textColor2: p.textSoft,
      textColor3: p.textMuted,
      cardColor: p.surfaceAlt,
    },
    Layout: {
      color: p.surface,
      headerColor: p.surface,
      siderColor: p.surface,
      footerColor: p.surface,
      siderBorderColor: p.border,
      borderColor: p.border,
    },
    Card: {
      color: p.surface,
      borderColor: p.border,
      borderRadius: '16px',
      paddingSmall: '16px',
      paddingMedium: '20px',
      paddingLarge: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
    },
    Menu: {
      itemHeight: '40px',
      borderRadius: '12px',
      itemColorActive: cssVar('--color-primary-light', 'rgba(6, 182, 212, 0.15)'),
      itemTextColorActive: p.primary,
      itemColorHover: cssVar('--color-secondary-hover', 'rgba(75, 85, 99, 0.1)'),
      borderColorHorizontal: p.border,
    },
    Button: {
      borderRadiusMedium: '12px',
      border: `1px solid ${p.border}`,
      textColor: p.text,
      textColorHover: p.text,
      textColorPressed: p.text,
      textColorFocus: p.text,
      textColorDisabled: p.textMuted,
      colorHover: p.surfaceAlt,
      colorPressed: p.surfaceAlt,
      colorFocus: p.surfaceAlt,
    },
    Tag: { borderRadius: '999px' },
    Notification: { color: p.surfaceAlt, textColor: p.text },
    AutoComplete: { peers: { InternalSelectMenu: { height: '480px', color: p.surfaceAlt } } },
  };
}

export const lightThemeOverrides: GlobalThemeOverrides = createLightThemeOverrides();
