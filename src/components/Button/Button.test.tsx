import { fireEvent, render, screen } from '@testing-library/react';

import Button, { IButtonProps } from './Button';

const defaultProps: IButtonProps = {
  intent: 'primary',
  text: 'Click me',
  onClick: jest.fn(),
};

const renderComponent = (props: Partial<IButtonProps>) => {
  return render(<Button {...defaultProps} {...props} />);
};

describe('Button component', () => {
  test('renders the button with the correct text', () => {
    renderComponent({});
    expect(screen.getByText(defaultProps.text)).toBeInTheDocument();
  });

  test('handles onClick event', () => {
    renderComponent({});
    fireEvent.click(screen.getByText(defaultProps.text));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('applies the correct intent styles', () => {
    const intents: IButtonProps['intent'][] = ['primary', 'secondary', 'outline', 'accent'];

    intents.forEach((intent) => {
      const { container } = renderComponent({ intent });
      const buttonElement = container.firstChild as HTMLElement;
      expect(buttonElement).toHaveClass(`cva-${intent}`);
    });
  });
});
