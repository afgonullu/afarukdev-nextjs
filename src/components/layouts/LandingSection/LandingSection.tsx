import { cva, VariantProps } from 'class-variance-authority';

import { paddingX } from '../consts';

const LandingSectionStyles = cva(['flex w-full flex-col py-4 justify-center items-center', paddingX]);

export interface ILandingSectionProps extends VariantProps<typeof LandingSectionStyles> {
  title: string;
  children: React.ReactNode;
}

const LandingSection = ({ title, children }: ILandingSectionProps) => (
  <div className={LandingSectionStyles()}>
    <h4>{title}</h4>
    {children}
  </div>
);

export default LandingSection;
