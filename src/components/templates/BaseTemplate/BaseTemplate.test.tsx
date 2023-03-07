import { render } from '@testing-library/react';

import BaseTemplate, { IBaseTemplateProps } from './BaseTemplate';

const renderComponent = (props: Partial<IBaseTemplateProps>) => {
  const defaultProps: IBaseTemplateProps = {
    name: 'John Doe',
  };
  return render(<BaseTemplate {...defaultProps} {...props} />);
};

describe('BaseTemplate', () => {
  it('should render', () => {
    const { container } = renderComponent({});

    expect(container).toBeInTheDocument();
  });
});
