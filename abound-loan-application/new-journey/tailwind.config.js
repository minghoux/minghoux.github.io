tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0E4533',
          hover: '#0A3325',
          pressed: '#071F17',
          subtle: '#EBF2ED',
        },
        charcoal: '#1A1917',
        lime: {
          DEFAULT: '#D4F19B',
          tint: '#EEF9D9',
        },
        'teal-sage': '#B8DCD2',
        bg: '#F4F8F1',
        success: { DEFAULT: '#0A5C3A', bg: '#EBF5EF' },
        danger: { DEFAULT: '#C4320A', bg: '#FEF3F2' },
        warning: { DEFAULT: '#B54708', bg: '#FDF6E8' },
        info: { DEFAULT: '#175CD3', bg: '#EDF6F5' },
      },
      borderRadius: {
        'standard': '14px',
        'large': '20px',
      },
      borderWidth: {
        '1.5': '1.5px',
      },
      fontFamily: {
        sans: ['Saans', 'DM Sans', 'sans-serif'],
      },
      keyframes: {
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      animation: {
        'fade-slide-in': 'fadeSlideIn 280ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scaleIn 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
      }
    }
  }
};
