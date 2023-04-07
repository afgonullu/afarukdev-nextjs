import { render } from '@testing-library/react';

import MainLayout, { IMainLayoutProps } from './MainLayout';

const renderComponent = (props: Partial<IMainLayoutProps>) => {
  const defaultProps: IMainLayoutProps = {
    children: <div>children</div>,
  };
  return render(<MainLayout {...defaultProps} {...props} />);
};

describe('MainLayout', () => {
  it('should render', () => {
    const { container } = renderComponent({});

    expect(container).toBeInTheDocument();
  });
});
