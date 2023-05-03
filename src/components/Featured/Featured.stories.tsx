import type { Meta, StoryObj } from '@storybook/react';

import type { IFeaturedProps } from './Featured';
import Featured from './Featured';

const props: IFeaturedProps = {
  name: 'Featured',
};

const meta: Meta<typeof Featured> = {
  component: Featured,
};

export default meta;

type Story = StoryObj<typeof Featured>;

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
