import { render } from '@testing-library/react';

import Footer, { IFooterProps } from './Footer';

const renderComponent = (props: Partial<IFooterProps>) => {
  const defaultProps: IFooterProps = {
    name: 'John Doe',
  };
  return render(<Footer {...defaultProps} {...props} />);
};

describe('Footer', () => {
  it('should render', () => {
    const { container } = renderComponent({});

    expect(container).toBeInTheDocument();
  });
});
