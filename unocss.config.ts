import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import { presetScrollbar } from 'unocss-preset-scrollbar';

export default defineConfig({
  presets: [presetUno(), presetAttributify({ ignoreAttributes: ['size'] }), presetTypography(), presetScrollbar()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      nyanza: { DEFAULT: '#d3f8e2', 100: '#0c4f27', 200: '#199f4e', 300: '#34df79', 400: '#83ecad', 500: '#d3f8e2', 600: '#dcf9e8', 700: '#e5fbed', 800: '#edfcf3', 900: '#f6fef9' },
      mauve: { DEFAULT: '#e4c1f9', 100: '#360851', 200: '#6c10a2', 300: '#a021e9', 400: '#c272f1', 500: '#e4c1f9', 600: '#eacffa', 700: '#efdbfb', 800: '#f5e7fd', 900: '#faf3fe' },
      amaranth_pink: { DEFAULT: '#f694c1', 100: '#480625', 200: '#910d4a', 300: '#d9136f', 400: '#ef4b98', 500: '#f694c1', 600: '#f7a9cd', 700: '#f9beda', 800: '#fbd4e6', 900: '#fde9f3' },
      vanilla: { DEFAULT: '#ede7b1', 100: '#433e0f', 200: '#877c1f', 300: '#caba2e', 400: '#ded26d', 500: '#ede7b1', 600: '#f1ecc0', 700: '#f4f1d0', 800: '#f8f5df', 900: '#fbfaef' },
      uranian_blue: { DEFAULT: '#a9def9', 100: '#05364e', 200: '#0b6c9c', 300: '#10a2eb', 400: '#5bc1f4', 500: '#a9def9', 600: '#bae5fa', 700: '#ccebfb', 800: '#ddf2fd', 900: '#eef8fe' },
    },
  },
  shortcuts: {
    // Scrollbar + surfaces (use uranian_blue as accent)
    'pretty-scrollbar': 'scrollbar scrollbar-w-6px scrollbar-rounded scrollbar-thumb-color-#5bc1f459 scrollbar-track-color-#0f141b dark:scrollbar-thumb-color-#a9def94d dark:scrollbar-track-color-#0b0f14',
    'divider': 'h-1px bg-#a9def94d',
    'bg-surface': 'bg-#0b0f14/95 dark:bg-#0f141b/90 backdrop-blur-lg',
    'bg-background': 'bg-#0b0f14 dark:bg-#0b0f14',
    'frost-panel': 'backdrop-blur-xl bg-#0f141b/80 border border-#a9def94d rounded-2xl shadow-[0_16px_32px_rgba(0,0,0,0.24)]',

    // Ring & shadows
    'ring': 'outline-none focus:outline-none focus:(ring-2 ring-offset-2) ring-#5bc1f47a ring-offset-#0000',
    'shadow-sm': 'shadow-[0_1px_2px_rgba(0,0,0,0.24)]',
    'shadow-md': 'shadow-[0_8px_16px_rgba(0,0,0,0.28)]',
    'shadow-lg': 'shadow-[0_16px_32px_rgba(0,0,0,0.32)]',
    'transition-base': 'transition-[background-color,border-color,opacity,transform,box-shadow,color] duration-150',

    // Buttons
    'btn-base': 'inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-sm font-medium rounded-md border transition-[background-color,border-color,color,box-shadow,transform] duration-150 ring',
    'btn': 'btn-base bg-#0f141b/80 border-#a9def94d text-#eef8fe hover:(bg-#0f1824/90 border-#a9def980) active:(translate-y-0.5)',
    'btn-primary': 'btn-base bg-#a9def9 text-#0a1219 border-transparent hover:bg-#5bc1f4',
    'btn-secondary': 'btn-base bg-#0b0f14/60 text-#eef8fe border-#a9def959 hover:border-#a9def980',
    'btn-ghost': 'btn-base bg-transparent border-transparent text-#0e1520 hover:(bg-#a9def91a border-#a9def94d)',

    // Inputs
    'input': 'w-full px-3 py-2 rounded-md bg-#ffffff border border-#a9def94d text-#0e1520 placeholder-#4a5b6c focus:(border-#a9def9) ring',
    'select': 'input',
    'textarea': 'input',
    'u-input': 'input',
    'u-select': 'input',
    'u-textarea': 'input',

    // Cards
    'card': 'rounded-lg border border-#a9def94d bg-#f8f5df p-4 shadow-md',

    // Badges (chips) - solid surface-based to avoid wrap-line color changes
    'badge': 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border text-[var(--ink)] bg-[var(--surface-card-alt)] border-[var(--surface-border)]',

    // Table
    'table-base': 'w-full border-collapse text-left text-sm text-#4a5b6c',
    'table-head': 'uppercase text-#1f2a36',
    'table-row': 'bg-#f8f5df hover:bg-#f4f1d0 transition-base',
    'table-cell': 'px-6 py-3',

    // Container
    'container': 'mx-auto w-full px-4 sm:px-6 md:px-8 max-w-7xl',

    // Typographic helpers
    'muted': 'text-#4a5b6c',
    'heading': 'font-semibold tracking-tight text-#0e1520',

    // Skeleton
    'skeleton': 'relative overflow-hidden bg-#0000000a rounded-md',
  },
});
