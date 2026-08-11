export const modernSlateEmeraldTheme = {
  name: 'Modern Slate & Emerald',
  colors: {
    primary: {
      light: '#34D399', // Emerald 400
      main: '#10B981',  // Emerald 500
      dark: '#059669',   // Emerald 600
      contrastText: '#FFFFFF',
    },
    slate: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
      950: '#020617',
    },
    accent: {
      amber: '#F59E0B',
      rose: '#F43F5E',
      indigo: '#6366F1',
    },
    background: {
      light: '#F8FAFC',
      dark: '#0F172A',
      surfaceLight: '#FFFFFF',
      surfaceDark: '#1E293B',
    },
    text: {
      primaryLight: '#0F172A',
      secondaryLight: '#475569',
      primaryDark: '#F8FAFC',
      secondaryDark: '#94A3B8',
    }
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
    borderRadius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      full: '9999px',
    },
    shadows: {
      card: '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
      emeraldGlow: '0 0 15px rgba(16, 185, 129, 0.35)',
    }
  }
};

export type ThemeType = typeof modernSlateEmeraldTheme;