'use client';

import { Button as NextButton } from '@nextui-org/react';
import { cva, VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';

const ButtonStyles = cva('w-48 h-10 flex justify-center items-center font-semibold tracking-tight rounded-full mr-4', {
  variants: {
    intent: {
      primary: 'bg-primary text-gray-50 hover:bg-gray-900 hover:text-secondary cva-primary',
      secondary: 'bg-secondary text-gray-50 hover:text-secondary hover:bg-gray-50 cva-secondary',
      outline:
        'bg-transparent border-4 border-secondary hover:bg-secondary text-gray-50 text-shadow-hero-title-sm hover:text-shadow-hero-title cva-outline',
      accent: 'bg-gray-50/60 text-secondary border-secondary border hover:text-shadow-hero-title-sm cva-accent',
    },
    /// ... other variants
  },
});

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
