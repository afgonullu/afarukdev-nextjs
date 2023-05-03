import { render } from '@testing-library/react';

import Featured, { IFeaturedProps } from './Featured';

const renderComponent = (props: Partial<IFeaturedProps>) => {
  const defaultProps: IFeaturedProps = {
    name: 'John Doe',
  };
  return render(<Featured {...defaultProps} {...props} />);
};

describe('Featured', () => {
  it('should render', () => {
    const { container } = renderComponent({});

    expect(container).toBeInTheDocument();
  });
});
