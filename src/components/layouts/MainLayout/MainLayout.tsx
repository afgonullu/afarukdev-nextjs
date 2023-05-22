'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/router';

import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';

const MainLayoutStyles = cva('flex w-full flex-col');

export interface IMainLayoutProps extends VariantProps<typeof MainLayoutStyles> {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  const router = useRouter();

  return (
    <div className={MainLayoutStyles()}>
      <Navbar intent={router.pathname === '/' ? 'transparent' : 'primary'} marginBottom={router.pathname === '/'} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
