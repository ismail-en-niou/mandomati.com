const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          dark: '#4338CA',
          'blue': {
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        },
        perspective: {
        '1000': '1000px',
        },
        secondary: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        accent: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        violet: {
          50: '#F5F3FF',
          600: '#7C3AED',
        },
        pink: {
          50: '#FDF2F8',
          600: '#DB2777',
        },
      },
      boxShadow: {
        lg: '0 10px 30px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 35px -4px rgba(0, 0, 0, 0.1)',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      zIndex: {
        '100': '100',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
       backdropFilter: {
        'none': 'none',
        'blur': 'blur(4px)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(8px)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: ["@tailwindcss/postcss"],
};

export default config;
