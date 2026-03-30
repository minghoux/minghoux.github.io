/**
 * Abound 2026 Design Tokens
 * Central source of truth for all brand styling and documentation data.
 * Used by tailwind.config.js and the Vue 3 documentation app.
 */

window.DESIGN_TOKENS = {
  version: '2.0.26',
  lastUpdated: 'March 2026',

  // --- PRIMITIVE PALETTE ---
  colors: {
    brand: {
      DEFAULT: '#0E4533',
      hover: '#0A3325',
      pressed: '#071F17',
      subtle: '#EBF2ED',
      name: 'Forest Green',
      use: 'Primary brand colour, main CTAs'
    },
    charcoal: {
      DEFAULT: '#201F1D',
      name: 'Charcoal',
      use: 'Main text and dark buttons'
    },
    lime: {
      DEFAULT: '#D4F19B',
      name: 'Lime',
      use: 'Accents, success backgrounds'
    },
    khaki: {
      DEFAULT: '#EDEABE',
      name: 'Khaki',
      use: 'Secondary brand accent'
    },
    'off-white': {
      DEFAULT: '#F4F8F3',
      name: 'Off-White',
      use: 'Light page & section backgrounds'
    },
    'pale-yellow-green': {
      DEFAULT: '#F7F7E9',
      name: 'Pale Yellow-Green',
      use: 'Marketing hero surfaces'
    },
    'teal-sage': {
      DEFAULT: '#B8DCD2',
      name: 'Teal/Sage',
      use: 'Calm UI accents & backgrounds'
    },
    success: {
      DEFAULT: '#0A5C3A',
      bg: '#EBF5EF',
      name: 'Success Green'
    },
    danger: {
      DEFAULT: '#C4320A',
      bg: '#FEF3F2',
      name: 'Error Red'
    },
    warning: {
      DEFAULT: '#B54708',
      bg: '#FDF6E8',
      name: 'Warning Orange'
    },
    info: {
      DEFAULT: '#175CD3',
      bg: '#EDF6F5',
      name: 'Info Blue'
    },
    neutral: {
      50: '#F4F7F4',
      100: '#E8EDEA',
      200: '#D3DCCF',
      300: '#B4C2B0',
      400: '#829080',
      500: '#586858',
      600: '#3F4F3F',
      700: '#2C3A2C',
      800: '#1C271C',
      900: '#111A11',
    }
  },

  // --- SPACING SCALE (4px base) ---
  spacing: [
    { token: '1',  value: '4px',   use: 'Tight inline gaps — icon-to-label, badge-to-text' },
    { token: '2',  value: '8px',   use: 'Small component gaps — between helper text and label' },
    { token: '3',  value: '12px',  use: 'Inner padding — compact cards, table cells' },
    { token: '4',  value: '16px',  use: 'Standard component padding — input horizontal padding' },
    { token: '5',  value: '20px',  use: 'Large component padding — card inner padding (mobile)' },
    { token: '6',  value: '24px',  use: 'Main grid gutter — standard gap between columns/cards' },
    { token: '8',  value: '32px',  use: 'Section inner padding — card bodies, form sections' },
    { token: '10', value: '40px',  use: 'Large section padding — between distinct form groups' },
    { token: '12', value: '48px',  use: 'Component vertical rhythm — between stacked cards' },
    { token: '14', value: '56px',  use: 'Hero inner padding — top/bottom on mobile hero sections' },
    { token: '16', value: '64px',  use: 'Section separation — between major page sections' },
    { token: '20', value: '80px',  use: 'Major page segments — vertical space on marketing pages' },
    { token: '24', value: '96px',  use: 'Hero vertical padding — desktop hero top/bottom' },
    { token: '32', value: '128px', use: 'Wide-screen section spacing' },
    { token: '40', value: '160px', use: 'Maximum spacing — full-bleed hero sections on large displays' }
  ],

  // --- TYPOGRAPHY ---
  typography: {
    stack: {
        brand: "'Saans', 'DM Sans', sans-serif",
        secondary: "'Inter', sans-serif",
        system: "Calibri, Arial, sans-serif"
    },
    scale: [
      { token: 'display-lg', px: '60px', weight: '700', lh: '1.05', letter: '-0.03em', example: 'Your loan, simplified' },
      { token: 'display-md', px: '48px', weight: '700', lh: '1.1', letter: '-0.02em', example: 'Personal loans' },
      { token: 'display-sm', px: '36px', weight: '700', lh: '1.2', letter: '-0.02em', example: 'How it works' },
      { token: 'heading-lg', px: '30px', weight: '700', lh: '1.3', letter: '-0.01em', example: 'Loan details' },
      { token: 'heading-md', px: '24px', weight: '700', lh: '1.3', letter: '-0.01em', example: 'Repayment schedule' },
      { token: 'heading-sm', px: '20px', weight: '500', lh: '1.4', letter: 'normal', example: 'Your monthly payment' },
      { token: 'body-lg', px: '18px', weight: '400', lh: '1.65', letter: 'normal', example: 'Get a personalised quote in minutes.' },
      { token: 'body-md', px: '16px', weight: '400', lh: '1.65', letter: 'normal', example: 'We’ll check your eligibility with a soft search.' },
      { token: 'body-sm', px: '14px', weight: '400', lh: '1.5', letter: 'normal', example: 'Representative APR 9.9% (variable).' },
      { token: 'label-lg', px: '16px', weight: '600', lh: '1.5', letter: 'normal', example: 'Loan amount' },
      { token: 'label-md', px: '14px', weight: '600', lh: '1.4', letter: 'normal', example: 'Get my quote' },
      { token: 'label-sm', px: '12px', weight: '600', lh: '1.2', letter: '0.04em', example: 'PRE-APPROVED' }
    ]
  },

  // --- RADII & SHADOWS ---
  radii: [
    { token: 'sm', value: '6px', use: 'Small badges, tags' },
    { token: 'md', value: '8px', use: 'Inputs, buttons' },
    { token: 'lg', value: '12px', use: 'Cards, panels' },
    { token: 'xl', value: '16px', use: 'Containers' },
    { token: '2xl', value: '24px', use: 'Hero sections' }
  ],
  shadows: [
    { token: 'xs', value: '0 1px 2px rgba(32,31,29,0.06)' },
    { token: 'sm', value: '0 1px 3px rgba(32,31,29,0.10)' },
    { token: 'md', value: '0 4px 8px -2px rgba(32,31,29,0.10)' },
    { token: 'lg', value: '0 12px 16px -4px rgba(32,31,29,0.09)' },
    { token: 'xl', value: '0 20px 24px -4px rgba(32,31,29,0.09)' }
  ],

  // --- GRADIENTS ---
  gradients: [
    { token: 'gradient-1', from: '#EAF1EA', to: '#CBE4C8', use: 'Primary textured bg element' },
    { token: 'gradient-2', from: '#F0EDC3', to: '#CBDAD9', use: 'Secondary background element' },
    { token: 'gradient-3', from: '#EAF1EA', to: '#B8DCD2', use: 'Brand transition elements' },
    { token: 'gradient-4', from: '#FFF9F4', to: '#D4F19B', use: 'Warm hero/marketing overlap' }
  ],
  // --- HELPERS FOR TAILWIND ---
  // (Flat objects that Tailwind expects)
  tailwind: {
    colors: {
      brand: {
        DEFAULT: '#0E4533',
        hover: '#0A3325',
        pressed: '#071F17',
        subtle: '#EBF2ED',
      },
      charcoal: '#201F1D',
      lime: '#D4F19B',
      khaki: '#EDEABE',
      'off-white': '#F4F8F3',
      'pale-yellow-green': '#F7F7E9',
      'teal-sage': '#B8DCD2',
      success: { DEFAULT: '#0A5C3A', bg: '#EBF5EF' },
      danger: { DEFAULT: '#C4320A', bg: '#FEF3F2' },
      warning: { DEFAULT: '#B54708', bg: '#FDF6E8' },
      info: { DEFAULT: '#175CD3', bg: '#EDF6F5' },
    },
    spacing: {
      '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px',
      '8': '32px', '10': '40px', '12': '48px', '14': '56px', '16': '64px',
      '20': '80px', '24': '96px', '32': '128px', '40': '160px'
    },
    borderRadius: {
      'sm': '6px', 'md': '8px', 'lg': '12px', 'xl': '16px', '2xl': '24px'
    },
    boxShadow: {
      'xs': '0 1px 2px rgba(32,31,29,0.06)',
      'sm': '0 1px 3px rgba(32,31,29,0.10)',
      'md': '0 4px 8px -2px rgba(32,31,29,0.10)',
      'lg': '0 12px 16px -4px rgba(32,31,29,0.09)',
      'xl': '0 20px 24px -4px rgba(32,31,29,0.09)',
    }
  }
};
