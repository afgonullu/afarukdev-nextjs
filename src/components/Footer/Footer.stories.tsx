import type { Meta, StoryObj } from '@storybook/react';

import type { IFooterProps } from './Footer';
import Footer from './Footer';

const props: IFooterProps = {
  name: 'Footer',
};

const meta: Meta<typeof Footer> = {
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof Footer>;

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
