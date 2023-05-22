import { cva, VariantProps } from 'class-variance-authority';

import { paddingX } from '../consts';

const PageLayoutStyles = cva(['flex w-full flex-col py-4 justify-center items-center', paddingX]);

export interface IPageLayoutProps extends VariantProps<typeof PageLayoutStyles> {
  title: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, children }: IPageLayoutProps) => (
  <div className={PageLayoutStyles()}>
    <h1>{title}</h1>
    {children}
  </div>
);

export default PageLayout;
