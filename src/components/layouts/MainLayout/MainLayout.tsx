import { cva, VariantProps } from 'class-variance-authority';

import Navbar from '../../Navbar/Navbar';

const MainLayoutStyles = cva('flex w-full flex-col px-32');

export interface IMainLayoutProps extends VariantProps<typeof MainLayoutStyles> {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => (
  <div className={MainLayoutStyles()}>
    <Navbar />
    {children}
    <div>footer</div>
  </div>
);

export default MainLayout;
