import { render } from '@testing-library/react';

import FeaturedCard, { IFeaturedCardProps } from './FeaturedCard';

const renderComponent = (props: Partial<IFeaturedCardProps>) => {
  const defaultProps: IFeaturedCardProps = {
    name: 'John Doe',
  };
  return render(<FeaturedCard {...defaultProps} {...props} />);
};

describe('FeaturedCard', () => {
  it('should render', () => {
    const { container } = renderComponent({});

    expect(container).toBeInTheDocument();
  });
});
