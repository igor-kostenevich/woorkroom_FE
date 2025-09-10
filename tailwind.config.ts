import type { Config } from 'tailwindcss';
import { colors } from './config/colors';

export default <Config>{
  content: ['./app/**/*.{vue,js,ts}', './*.vue'],
  theme: {
    extend: {
      colors,
      letterSpacing: {},
      fontFamily: {
        'nunito-sans': ['Nunito Sans', 'sans-serif'],
      },
      keyframes: {
        'head-shake': {
          '0%': { transform: 'translate(0)' },
          '6.5%': { transform: 'translate(-6px) rotateY(-9deg)' },
          '18.5%': { transform: 'translate(5px) rotateY(7deg)' },
          '31.5%': { transform: 'translate(-3px) rotateY(-5deg)' },
          '43.5%': { transform: 'translate(2px) rotateY(3deg)' },
          '50%': { transform: 'translate(0)' },
        },
      },
      animation: {
        'head-shake': 'head-shake 0.6s ease-in-out',
      },
      boxShadow: {
        base: '0px 6px 58px 0px rgba(196, 203, 214, 0.1)',
        secondary: '0px 1px 2px 0px rgba(184, 200, 224, 0.22)',
        primary: '0px 1px 4px rgba(63, 140, 255, 0.263)',
        'primary-light': '1px 1px 4px rgba(63, 140, 255, 0.263)',
      },
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(166deg, #0B0B0B 57%, #00A7E3 100%)',
        'gradient-secondary':
          'linear-gradient(166deg, rgba(11, 11, 11, 0.42) 42%, #00A7E3 100%)',
      },
    },
  },
  plugins: [],
};
