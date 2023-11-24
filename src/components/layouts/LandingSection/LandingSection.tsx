import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';

import { paddingX } from '../consts';

const LandingSectionStyles = cva(['flex w-full h-full justify-start items-center px-8 xl:px-0'], {
  variants: {
    background: {
      primary: 'bg-primary text-gray-50',
      secondary: 'bg-secondary text-gray-50',
      light: 'bg-gray-50 text-gray-900',
      dark: 'bg-gray-900 text-gray-50',
    },
    hasPadding: {
      true: paddingX,
    },
    hasImage: {
      false: 'flex-col py-8 justify-center',
      true: 'items-stretch gap-8',
    },
    imagePosition: {
      left: 'flex-row xl:pr-8',
      right: 'flex-row-reverse xl:pl-8',
    },
  },
  defaultVariants: {
    hasPadding: false,
    imagePosition: 'left',
  },
});

export interface ILandingSectionProps extends VariantProps<typeof LandingSectionStyles> {
  title: string;
  children: React.ReactNode;
  background: 'primary' | 'secondary' | 'light' | 'dark';
  hasPadding?: boolean;
  image?: string;
  imagePosition: 'left' | 'right' | null;
}

const LandingSection = ({
  title,
  children,
  background,
  hasPadding = false,
  image,
  imagePosition,
}: ILandingSectionProps) => (
  <div className={LandingSectionStyles({ background, hasPadding, hasImage: !!image, imagePosition })}>
    {image ? (
      <>
        <div className="relative hidden overflow-hidden xl:flex xl:w-5/12">
          <Image src={image} alt="Background of Landing Page" fill className="object-cover object-top" />
        </div>
        <div className="w-full flex-col py-12 xl:w-7/12">
          <h3 className="py-6">{title}</h3>
          {children}
        </div>
      </>
    ) : (
      <>
        <h3 className="py-6">{title}</h3>
        {children}
      </>
    )}
  </div>
);

export default LandingSection;
