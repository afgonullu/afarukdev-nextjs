import { cva, VariantProps } from 'class-variance-authority';

import { paddingX } from '../consts';

const PageLayoutStyles = cva(['flex w-full grow flex-col py-4 justify-center items-center', paddingX], {
  variants: {
    background: {
      primary: 'bg-primary text-gray-50',
      secondary: 'bg-secondary text-gray-50',
      light: 'bg-gray-50 text-gray-900',
      dark: 'bg-gray-900 text-gray-50',
    },
  },
});

export interface IPageLayoutProps extends VariantProps<typeof PageLayoutStyles> {
  title: string;
  background: 'primary' | 'secondary' | 'light' | 'dark';
  children: React.ReactNode;
}

const PageLayout = ({ title, background, children }: IPageLayoutProps) => (
  <div className={PageLayoutStyles({ background })}>
    <h1>{title}</h1>
    {children}
  </div>
);

export default PageLayout;
