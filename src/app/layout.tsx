import '../styles/globals.css';

import { Besley, Bodoni_Moda, Jost } from 'next/font/google';

import GoogleAnalytics from '../components/GoogleAnalytics/GoogleAnalytics';
import MainLayout from '../components/layouts/MainLayout/MainLayout';
import config from '../lib/config';
import Providers from './providers';

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  display: 'swap',
});

const besley = Besley({
  variable: '--font-besley',
  subsets: ['latin'],
  display: 'swap',
});

const bodoni = Bodoni_Moda({
  variable: '--font-bodoni',
  subsets: ['latin'],
  display: 'swap',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${besley.variable} ${bodoni.variable}`}>
        {config.googleAnalyticsId ? <GoogleAnalytics ga_id={config.googleAnalyticsId} /> : null}
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
