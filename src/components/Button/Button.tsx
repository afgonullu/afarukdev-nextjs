'use client';

import { Button as NextButton } from '@nextui-org/react';
import { cva, VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';

const ButtonStyles = cva(
  'mr-4 flex h-10 w-48 items-center justify-center rounded-full font-semibold tracking-tight data-[hover]:opacity-100',
  {
    variants: {
      intent: {
        primary: 'bg-primary text-gray-50 hover:border-primary hover:bg-gray-50 hover:text-gray-900',
        secondary: 'bg-secondary text-gray-50 hover:bg-gray-50 hover:text-secondary',
        outline:
          'border-4 border-secondary bg-secondary/10 text-gray-900 text-shadow-hero-title-sm hover:bg-secondary hover:text-shadow-hero-title',
        accent: 'border border-secondary bg-gray-900 text-secondary hover:text-shadow-hero-title-sm',
      },
      /// ... other variants
    },
  }
);

export interface IButtonProps extends VariantProps<typeof ButtonStyles> {
  intent: 'primary' | 'secondary' | 'outline' | 'accent';
  text: string;
  src: string;
}

const Button = ({ intent, text, src }: IButtonProps) => {
  const router = useRouter();
  return (
    <NextButton className={ButtonStyles({ intent })} onPress={() => router.push(src)}>
      {text}
    </NextButton>
  );
};

export default Button;
