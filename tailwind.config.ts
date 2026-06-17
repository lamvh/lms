import type { Config } from 'tailwindcss';

/**
 * EduNex design tokens as named Tailwind theme tokens.
 * App palette (warm charcoal + gold + cream) from edunex/theme.css over styles.css.
 * Landing palette (cream + gold) from EduNex Landing.html.
 * Radii/shadows from styles.css (the --radius-scale knob is dropped: design-tool only).
 * Components consume these via utilities: bg-a-500, rounded-md, shadow-pop, font-head.
 */
const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // App · primary warm-charcoal scale (sidebar, structure, headings)
        p: {
          50: '#F6F3EC',
          100: '#E9E6DE',
          200: '#D5D8DE',
          300: '#A2A7B1',
          400: '#6E7480',
          500: '#474D5A',
          600: '#333845',
          700: '#242832',
          800: '#1C1F26',
          900: '#15171C',
        },
        // App · accent EduNex gold
        a: {
          50: '#FFF9E8',
          100: '#FFEFC2',
          400: '#FFC93D',
          500: '#F2B400',
          600: '#D29900',
          700: '#B07E00',
        },
        // App · warm ink / text greys
        ink: {
          900: '#191B20',
          800: '#262A31',
          700: '#383D46',
          600: '#4D525C',
          500: '#646A75',
          400: '#8B909B',
          300: '#AEB2BB',
        },
        // App · brand/accent hooks
        brand: '#22262F',
        'brand-strong': '#15171C',
        accent: '#F2B400',
        // App · surfaces, lines, canvas
        line: '#E9E4D9',
        'line-soft': '#F1EDE3',
        bg: '#F6F3EC',
        surface: '#FFFFFF',
        'surface-2': '#FBF8F1',
        'surface-3': '#F1ECE1',
        // App · status pairs (foreground · background)
        success: '#2E9E6B',
        'success-bg': '#DFF2E8',
        warn: '#C9821F',
        'warn-bg': '#FBF1E0',
        danger: '#D55B43',
        'danger-bg': '#FBE7E2',
        info: '#2A6298',
        'info-bg': '#E5EEF6',
        zalo: '#0068FF',
        'zalo-bg': '#E5F0FF',
        // Landing · cream + gold marketing palette
        cream: '#FBF6EA',
        'cream-2': '#F6EEDC',
        paper: '#FFFFFF',
        'l-ink': '#22252E',
        'l-ink-2': '#3C414C',
        muted: '#6E7280',
        gold: '#F2B400',
        'gold-600': '#D29900',
        'gold-700': '#A9760B',
        'gold-soft': '#FFF1CD',
        'gold-tint': '#FCF6E6',
        'l-line': '#ECE1CC',
        'l-line-soft': '#F4ECDC',
        green: '#2E9E6B',
      },
      fontFamily: {
        head: ['"Bricolage Grotesque"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        xs: '6px',
        sm: '9px',
        md: '13px',
        lg: '18px',
        xl: '24px',
        pill: '999px',
      },
      boxShadow: {
        'sh-1': '0 1px 2px rgba(16,40,64,.06), 0 1px 3px rgba(16,40,64,.05)',
        'sh-2': '0 2px 6px rgba(16,40,64,.05), 0 10px 26px rgba(16,40,64,.06)',
        'sh-card': '0 1px 0 rgba(16,40,64,.03), 0 4px 18px rgba(16,40,64,.05)',
        'sh-pop': '0 8px 28px rgba(16,40,64,.14), 0 2px 8px rgba(16,40,64,.08)',
        // Landing-specific warm shadows
        'l-card': '0 1px 2px rgba(60,45,15,.05), 0 14px 34px rgba(60,45,15,.07)',
        'l-soft': '0 1px 2px rgba(60,45,15,.04), 0 6px 18px rgba(60,45,15,.05)',
      },
      maxWidth: {
        wrap: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
