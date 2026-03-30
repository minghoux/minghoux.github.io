/**
 * Abound Tailwind Configuration
 * Refactored to use centralized DESIGN_TOKENS.
 */

const tokens = window.DESIGN_TOKENS.tailwind || {};

tailwind.config = {
  theme: {
    extend: {
      backgroundImage: {
        'gradient-1': `linear-gradient(to bottom, #EAF1EA, #CBE4C8)`,
        'gradient-2': `linear-gradient(to top, #F0EDC3, #CBDAD9)`,
        'gradient-3': `linear-gradient(to bottom, #EAF1EA, #B8DCD2)`,
        'gradient-4': `linear-gradient(to bottom, #FFF9F4, #D4F19B)`
      },
      colors: tokens.colors || {},
      spacing: tokens.spacing || {},
      borderRadius: tokens.borderRadius || {},
      boxShadow: tokens.boxShadow || {},
      fontFamily: {
        sans: ['Saans', 'DM Sans', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' }
        },
        'fade-slide-in': {
          'from': { opacity: '0', transform: 'translateY(8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'shimmer': 'shimmer 1.4s ease-in-out infinite',
        'fade-in': 'fade-slide-in 200ms ease-out both'
      }
    }
  }
};
