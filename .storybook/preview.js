import { Besley, Bodoni_Moda, Jost } from 'next/font/google';
import '../src/styles/globals.css';

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin']
});

const besley = Besley({
  variable: '--font-besley',
  subsets: ['latin']
});

const bodoni = Bodoni_Moda({
  variable: '--font-bodoni',
  subsets: ['latin']
});

export const decorators = [(Story) => (
  <main className={`${jost.variable} ${besley.variable} ${bodoni.variable}`}>
    {Story()}
  </main>
),]

const BREAKPOINTS_INT = {
  xs: 375,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const customViewports = Object.fromEntries(
  Object.entries(BREAKPOINTS_INT).map(([key, val], idx) => {
    return [
      key,
      {
        name: key,
        styles: {
          width: `${val}px`,
          height: `${(idx + 5) * 10}vh`,
        },
      },
    ];
  })
);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
}