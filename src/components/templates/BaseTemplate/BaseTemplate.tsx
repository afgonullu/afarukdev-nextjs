import { cva, VariantProps } from 'class-variance-authority';

const BaseTemplateStyles = cva('flex w-60 items-center justify-center p-4', {
  variants: {
    intent: {
      primary: 'bg-primary text-gray-50',
      secondary: 'bg-secondary text-gray-50',
    },
    /// ... other variants
  },
});

export interface IBaseTemplateProps extends VariantProps<typeof BaseTemplateStyles> {
  name: string;
}

const BaseTemplate = ({ intent = 'primary', name }: IBaseTemplateProps) => {
  const greet = 'Hello world!';

  return <div className={BaseTemplateStyles({ intent })}>{`${name}, ${greet}`}</div>;
};

export default BaseTemplate;
