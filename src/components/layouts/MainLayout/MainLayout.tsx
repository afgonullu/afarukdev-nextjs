'use client';

import { cva, VariantProps } from 'class-variance-authority';

import Footer from '../../LayoutComponents/Footer/Footer';
import Navbar from '../../LayoutComponents/Navbar/Navbar';

const MainLayoutStyles = cva('flex min-h-screen w-full flex-col');

export interface IMainLayoutProps extends VariantProps<typeof MainLayoutStyles> {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <div className={MainLayoutStyles()}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
