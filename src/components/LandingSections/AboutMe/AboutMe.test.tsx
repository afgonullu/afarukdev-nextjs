import { render } from '@testing-library/react';

import AboutMe, { IAboutMeProps } from './AboutMe';

const renderComponent = (props: Partial<IAboutMeProps>) => {
  const defaultProps: IAboutMeProps = {
    aboutMe: {
      title: 'About Me',
      text: 'Test',
    },
  };
  return render(<AboutMe {...defaultProps} {...props} />);
};

describe('AboutMe', () => {
  it('should render', () => {
    const { container } = renderComponent({});

    expect(container).toBeInTheDocument();
  });
});
