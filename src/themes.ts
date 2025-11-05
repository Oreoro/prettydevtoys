import type { GlobalThemeOverrides } from 'naive-ui';

function cssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function createPalette() {
  const accent = cssVar('--accent', '#a9def9');
  const success = cssVar('--success', '#d3f8e2');
  const warning = cssVar('--warning', '#ede7b1');
  const danger = cssVar('--danger', '#f694c1');
  const text = cssVar('--ink', '#0e1520');
  const textSoft = cssVar('--ink-soft', '#1f2a36');
  const textMuted = cssVar('--ink-muted', '#4a5b6c');
  const surface = cssVar('--surface-elev-1', '#ffffff');
  const surfaceAlt = cssVar('--surface-elev-2', '#f7f7f7');
  const border = cssVar('--surface-border', '#e5e7eb');

  return {
    primary: accent,
    primaryHover: accent,
    primaryPressed: accent,
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
      color: p.surfaceAlt,
      borderColor: p.border,
      borderRadius: '12px',
      paddingSmall: '16px',
      paddingMedium: '18px',
      paddingLarge: '22px',
      boxShadow: '0 12px 28px rgba(0,0,0,0.1)',
    },
    Menu: {
      itemHeight: '36px',
      borderRadius: '10px',
      itemColorActive: 'rgba(0,0,0,0.06)',
      itemTextColorActive: p.text,
      itemColorHover: 'rgba(0,0,0,0.04)',
      borderColorHorizontal: p.border,
    },
    Button: {
      borderRadiusMedium: '10px',
      border: `1px solid ${p.border}`,
      textColor: p.text,
    },
    Tag: { borderRadius: '999px' },
    Notification: { color: p.surfaceAlt, textColor: p.text },
    AutoComplete: { peers: { InternalSelectMenu: { height: '480px', color: p.surfaceAlt } } },
  };
}

export const lightThemeOverrides: GlobalThemeOverrides = createLightThemeOverrides();
