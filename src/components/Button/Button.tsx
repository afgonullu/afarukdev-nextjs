import { cva, VariantProps } from 'class-variance-authority';

const ButtonStyles = cva('w-48 h-10 flex justify-center items-center font-semibold tracking-tight rounded-full', {
  variants: {
    intent: {
      primary: 'bg-primary text-gray-50 hover:bg-gray-900 hover:text-secondary cva-primary',
      secondary: 'bg-secondary text-gray-50 hover:text-secondary hover:bg-gray-50 cva-secondary',
      outline:
        'bg-transparent border-4 border-secondary text-gray-50 text-shadow-hero-title-sm hover:text-shadow-hero-title cva-outline',
      accent: 'bg-gray-50/60 text-secondary border-secondary border hover:text-shadow-hero-title-sm cva-accent',
    },
    /// ... other variants
  },
});

export interface IButtonProps extends VariantProps<typeof ButtonStyles> {
  intent: 'primary' | 'secondary' | 'outline' | 'accent';
  text: string;
  onClick: () => void;
}

const Button = ({ intent, text, onClick }: IButtonProps) => {
  return (
    <button type="button" onClick={onClick} className={ButtonStyles({ intent })}>
      {text}
    </button>
  );
};

export default Button;
