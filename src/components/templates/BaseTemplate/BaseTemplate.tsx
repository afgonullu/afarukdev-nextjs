import { cva, VariantProps } from 'class-variance-authority';

const BaseTemplateStyles = cva('p-4 flex justify-center items-center w-60', {
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
