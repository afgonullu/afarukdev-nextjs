import { render } from '@testing-library/react';

import Hero, { IHeroProps } from './Hero';

const defaultProps: IHeroProps = {
  hero: {
    greeting: 'Hello, My Name is Faruk',
    title: 'World',
    description: 'This is a description',
  },
};
const renderComponent = (props: Partial<IHeroProps>) => render(<Hero {...defaultProps} {...props} />);

describe('Hero', () => {
  it('should render', () => {
    const { container, getByText } = renderComponent({});

    expect(container).toBeInTheDocument();
    expect(getByText(defaultProps.hero.greeting)).toBeInTheDocument();
    expect(getByText(defaultProps.hero.title)).toBeInTheDocument();
    expect(getByText(defaultProps.hero.description)).toBeInTheDocument();
  });
});
