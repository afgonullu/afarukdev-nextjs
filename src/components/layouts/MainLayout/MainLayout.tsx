'use client';

import { cva, VariantProps } from 'class-variance-authority';

import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';

const MainLayoutStyles = cva('flex w-full flex-col');

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
