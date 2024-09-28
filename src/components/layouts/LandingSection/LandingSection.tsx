import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';

import { marginX } from '../consts';

const LandingTitleStyles = cva(['px-4 py-6'], {
  variants: {
    titleColor: {
      primary: ' text-primary',
      secondary: 'text-secondary',
      light: 'text-primary underline decoration-secondary',
      dark: 'text-gray-50',
    },
  },
});

const LandingSectionStyles = cva(['mx-8 my-4 flex h-full items-center justify-start overflow-hidden'], {
  variants: {
    titleColor: {
      primary: ' border-primary bg-primary',
      secondary: ' border-secondary bg-secondary',
      light: 'bg-gray-50 text-gray-900',
      dark: 'bg-gray-900 text-gray-50',
    },
    hasBorder: {
      true: 'rounded-2xl border shadow-md',
    },
    hasMargin: {
      true: marginX,
    },
    hasImage: {
      false: 'flex-col justify-center',
      true: 'items-stretch gap-8',
    },
    imagePosition: {
      left: 'flex-row xl:pr-8',
      right: 'flex-row-reverse xl:pl-8',
    },
  },
  defaultVariants: {
    hasMargin: false,
    imagePosition: 'left',
  },
});

export interface ILandingSectionProps extends VariantProps<typeof LandingSectionStyles> {
  title: string;
  children: React.ReactNode;
  titleColor: 'primary' | 'secondary' | 'light' | 'dark';
  hasMargin?: boolean;
  hasBorder?: boolean;
  image?: string;
  imagePosition: 'left' | 'right' | null;
}

const LandingSection = ({
  title,
  children,
  titleColor,
  hasMargin = false,
  hasBorder = false,
  image,
  imagePosition,
}: ILandingSectionProps) => (
  <div className={LandingSectionStyles({ hasMargin, hasBorder, hasImage: !!image, imagePosition, titleColor })}>
    {image ? (
      <>
        <div className="relative hidden overflow-hidden xl:flex xl:w-5/12">
          <Image
            src={image}
            alt="Background of Landing Page"
            fill
            className=" object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex-col py-12 xl:w-7/12">
          <h3 className={LandingTitleStyles({ titleColor })}>{title}</h3>
          {children}
        </div>
      </>
    ) : (
      <>
        <h3 className={LandingTitleStyles({ titleColor })}>{title}</h3>
        {children}
      </>
    )}
  </div>
);

export default LandingSection;
