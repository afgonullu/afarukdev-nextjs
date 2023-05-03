import type { Meta, StoryObj } from '@storybook/react';

import type { IFeaturedCardProps } from './FeaturedCard';
import FeaturedCard from './FeaturedCard';

const props: IFeaturedCardProps = {
  name: 'FeaturedCard',
};

const meta: Meta<typeof FeaturedCard> = {
  component: FeaturedCard,
};

export default meta;

type Story = StoryObj<typeof FeaturedCard>;

export const Primary: Story = {
  args: {
    name: props.name,
  },
};

export const Secondary: Story = {
  args: {
    name: props.name,
    intent: 'secondary',
  },
};
