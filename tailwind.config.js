const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: colors.blue,
      secondary: colors.emerald,
      gray: colors.slate,
      orange: colors.amber,
      red: colors.red,
      blue: colors.sky,
      purple: colors.violet,
      transparent: colors.transparent
    },
    extend: {
      screens: {
        '3xl': '1870px',
      },
      colors: {
        primary: {
          500: "#0066ff",
          DEFAULT: "#0066ff"
        },
        secondary: {
          500: "#00cc99",
          DEFAULT: "#00cc99"
        },
        gray: {
          50: "#fafdfc",
          900: '#001a33',
        },
        orange: {
          500: "#ffaa00",
          DEFAULT: "#ffaa00"
        },
        red: {
          500: "#e74c3c",
          DEFAULT: "#e74c3c"
        },
        sky: {
          500: "#1e90ff",
          DEFAULT: "#1e90ff"
        },
        purple: {
          500: "#9b59b6",
          DEFAULT: "#9b59b6"
        }
      },
      fontFamily: {
        sans: ['var(--font-jost)', ...fontFamily.sans],
        serif: ['var(--font-besley)', ...fontFamily.serif],
        bodoni: ['var(--font-bodoni)', ...fontFamily.serif],
      },
      textShadow: {
        'hero-title': "-0.1rem 0rem #00CC99, 0rem 0.1rem #0066FF",
        'hero-title-sm': "-0.05rem 0rem #00CC99, 0rem 0.05rem #0066FF",
      },
      dropShadow: {
        'navbar-svg-0': '-0.05rem 0rem 0rem #00CC99',
        'navbar-svg-1': '0rem 0.05rem 0rem #0066FF',
      },
      keyframes: {
        reveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
      },
      animation: {
        reveal: 'reveal 0.4s forwards',
      },
    }
  },
  variants: {
    extend: {
      filter: ['hover', 'focus'],
    }
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}