import { darken, lighten } from '../color/color.models';
import { defineThemes } from '../theme/theme.models';
import { appThemes } from '../theme/themes';

function createState({
  textColor,
  backgroundColor,
  hoverBackground,
  hoveredTextColor = textColor,
  pressedBackground,
  pressedTextColor = textColor,
}: {
  textColor: string
  backgroundColor: string
  hoverBackground: string
  hoveredTextColor?: string
  pressedBackground: string
  pressedTextColor?: string
}) {
  return {
    textColor,
    backgroundColor,
    hover: { textColor: hoveredTextColor, backgroundColor: hoverBackground },
    pressed: { textColor: pressedTextColor, backgroundColor: pressedBackground },
  };
}

function createTheme({ style }: { style: 'light' | 'dark' }) {
  const theme = appThemes[style];

  return {
    size: {
      small: {
        width: '28px',
        fontSize: '12px',
      },
      medium: {
        width: '34px',
        fontSize: '14px',
      },
      large: {
        width: '40px',
        fontSize: '16px',
      },
    },

    basic: {
      default: createState({
        textColor: theme.text.baseColor,
        backgroundColor: theme.default.color,
        hoverBackground: theme.default.colorHover,
        pressedBackground: theme.default.colorPressed,
      }),
      primary: createState({
        textColor: '#ffffff',
        backgroundColor: 'linear-gradient(90deg, var(--accent-pink-primary), var(--accent-blue-primary))',
        hoverBackground: 'linear-gradient(90deg, var(--accent-blue-primary), var(--accent-teal-primary))',
        pressedBackground: 'linear-gradient(90deg, var(--accent-gold-primary), var(--accent-pink-primary))',
      }),
      warning: createState({
        textColor: theme.warning.color,
        backgroundColor: theme.warning.colorFaded,
        hoverBackground: lighten(theme.warning.colorFaded, 30),
        pressedBackground: darken(theme.warning.colorFaded, 30),
      }),
      error: createState({
        textColor: theme.error.color,
        backgroundColor: theme.error.colorFaded,
        hoverBackground: lighten(theme.error.colorFaded, 30),
        pressedBackground: darken(theme.error.colorFaded, 30),
      }),
    },
    text: {
      default: createState({
        textColor: theme.text.baseColor,
        backgroundColor: 'transparent',
        hoverBackground: 'linear-gradient(90deg, rgba(0,0,0,0.04), rgba(0,0,0,0.06))',
        pressedBackground: 'linear-gradient(90deg, rgba(0,0,0,0.08), rgba(0,0,0,0.12))',
      }),
      primary: createState({
        textColor: theme.primary.color,
        backgroundColor: 'transparent',
        hoverBackground: theme.primary.colorFaded,
        pressedBackground: darken(theme.primary.colorFaded, 30),
      }),
      warning: createState({
        textColor: darken(theme.warning.color, 20),
        backgroundColor: 'transparent',
        hoverBackground: theme.warning.colorFaded,
        pressedBackground: darken(theme.warning.colorFaded, 30),
      }),
      error: createState({
        textColor: darken(theme.error.color, 20),
        backgroundColor: 'transparent',
        hoverBackground: theme.error.colorFaded,
        pressedBackground: darken(theme.error.colorFaded, 30),
      }),
    },
  };
}

export const { useTheme } = defineThemes({
  dark: createTheme({ style: 'dark' }),
  light: createTheme({ style: 'light' }),
});
