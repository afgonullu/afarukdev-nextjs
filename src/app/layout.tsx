import '../styles/globals.css';

import { Besley, Bodoni_Moda, Jost } from 'next/font/google';

import MainLayout from '../components/layouts/MainLayout/MainLayout';

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
});

const besley = Besley({
  variable: '--font-besley',
  subsets: ['latin'],
});

const bodoni = Bodoni_Moda({
  variable: '--font-bodoni',
  subsets: ['latin'],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${besley.variable} ${bodoni.variable}`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
};

export default RootLayout;
