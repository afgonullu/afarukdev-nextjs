'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { usePathname } from 'next/navigation';

import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';

const MainLayoutStyles = cva('flex w-full flex-col');

export interface IMainLayoutProps extends VariantProps<typeof MainLayoutStyles> {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className={MainLayoutStyles()}>
      <Navbar intent={pathname === '/' ? 'transparent' : 'primary'} marginBottom={pathname === '/'} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
