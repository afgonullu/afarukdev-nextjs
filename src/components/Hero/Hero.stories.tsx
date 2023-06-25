import type { Meta, StoryObj } from '@storybook/react';

import type { IHeroProps } from './Hero';
import Hero from './Hero';

const props: IHeroProps = {
  hero: {
    greeting: 'HI, I AM FARUK 👋',
    title: 'Building Better Solutions for a Better World.',
    text: 'Transforming complex problems into elegantly crafted solutions is my passion. With a proven track record of delivering sustainable and efficient products and operations, I now channel that expertise into building exceptional digital experiences through code.',
  },
};

const meta: Meta<typeof Hero> = {
  component: Hero,
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Primary: Story = {
  args: {
    ...props,
  },
};
