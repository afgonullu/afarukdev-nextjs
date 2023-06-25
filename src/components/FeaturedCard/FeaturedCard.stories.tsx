import type { Meta, StoryObj } from '@storybook/react';

import type { IFeaturedCardProps } from './FeaturedCard';
import FeaturedCard from './FeaturedCard';

const props: IFeaturedCardProps = {
  post: {
    id: '1',
    slug: 'test',
    title: 'Test',
    excerpt: 'Test',
    feature_image: 'https://via.placeholder.com/150',
  },
};

const meta: Meta<typeof FeaturedCard> = {
  component: FeaturedCard,
};

export default meta;

type Story = StoryObj<typeof FeaturedCard>;

export const Primary: Story = {
  args: {
    post: props.post,
  },
};

export const Secondary: Story = {
  args: {
    post: props.post,
  },
};
