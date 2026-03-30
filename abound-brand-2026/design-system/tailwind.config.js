tailwind.config = {
  theme: {
    extend: {
      backgroundImage: {
        'gradient-1': 'linear-gradient(to bottom, #EAF1EA, #CBE4C8)',
        'gradient-2': 'linear-gradient(to top, #F0EDC3, #CBDAD9)',
        'gradient-3': 'linear-gradient(to bottom, #EAF1EA, #B8DCD2)',
        'gradient-4': 'linear-gradient(to bottom, #FFF9F4, #D4F19B)'
      },
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
        success: {
          DEFAULT: '#0A5C3A',
          bg: '#EBF5EF',
        },
        danger: {
          DEFAULT: '#C4320A',
          bg: '#FEF3F2',
        },
        warning: {
          DEFAULT: '#B54708',
          bg: '#FDF6E8',
        },
        info: {
          DEFAULT: '#175CD3',
          bg: '#EDF6F5',
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
        },
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
        '40': '160px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(32,31,29,0.06)',
        'sm': '0 1px 3px rgba(32,31,29,0.10), 0 1px 2px rgba(32,31,29,0.06)',
        'md': '0 4px 8px -2px rgba(32,31,29,0.10), 0 2px 4px -2px rgba(32,31,29,0.06)',
        'lg': '0 12px 16px -4px rgba(32,31,29,0.09), 0 4px 6px -2px rgba(32,31,29,0.04)',
        'xl': '0 20px 24px -4px rgba(32,31,29,0.09), 0 8px 8px -4px rgba(32,31,29,0.04)',
      },
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
}
