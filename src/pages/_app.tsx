import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { Besley, Bodoni_Moda, Jost } from 'next/font/google';

import MainLayout from '../components/layouts/MainLayout/MainLayout';

const jost = Jost({
  variable: '--font-jost',
});

const besley = Besley({
  variable: '--font-besley',
});

const bodoni = Bodoni_Moda({
  variable: '--font-bodoni',
});

const App = ({ Component, pageProps }: AppProps) => (
  <div className={`${jost.variable} ${besley.variable} ${bodoni.variable}`}>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </div>
);

export default App;
