import { render } from '@testing-library/react';

import LandingSection, { ILandingSectionProps } from './LandingSection';

const renderComponent = (props: Partial<ILandingSectionProps>) => {
  const defaultProps: ILandingSectionProps = {
    title: 'title',
    children: <div>children</div>,
  };
  return render(<LandingSection {...defaultProps} {...props} />);
};

describe('LandingSection', () => {
  it('should render', () => {
    const { container } = renderComponent({});

    expect(container).toBeInTheDocument();
  });
});
