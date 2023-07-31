import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';

import { paddingX } from '../consts';

const LandingSectionStyles = cva(['flex w-full h-full justify-start items-center'], {
  variants: {
    background: {
      primary: 'bg-primary text-gray-50',
      secondary: 'bg-secondary text-gray-50',
      accent: 'bg-gray-50/60 text-secondary',
    },
    hasPadding: {
      true: paddingX,
    },
    hasImage: {
      false: 'flex-col py-4 justify-center',
    },
  },
  defaultVariants: {
    hasPadding: false,
  },
});

export interface ILandingSectionProps extends VariantProps<typeof LandingSectionStyles> {
  title: string;
  children: React.ReactNode;
  background: 'primary' | 'secondary' | 'accent';
  hasPadding?: boolean;
  image?: string;
}

const LandingSection = ({ title, children, background, hasPadding = false, image }: ILandingSectionProps) => (
  <div className={LandingSectionStyles({ background, hasPadding, hasImage: !!image })}>
    {image ? (
      <>
        <div className="relative hidden h-full overflow-hidden xl:flex xl:w-5/12">
          <Image
            src={image}
            alt="Background of Landing Page"
            fill
            className="!relative h-full object-cover object-center"
          />
        </div>
        <div className="ml-4 w-full flex-col py-4 xl:w-7/12">
          <h4>{title}</h4>
          {children}
        </div>
      </>
    ) : (
      <>
        <h4>{title}</h4>
        {children}
      </>
    )}
  </div>
);

export default LandingSection;
