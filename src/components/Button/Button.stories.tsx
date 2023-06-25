import type { Meta, StoryObj } from '@storybook/react';

import type { IButtonProps } from './Button';
import Button from './Button';

const props: IButtonProps = {
  text: 'Learn More',
  src: '/projects',
  intent: 'primary',
};

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    text: props.text,
    intent: props.intent,
    src: '/projects',
  },
};

export const Secondary: Story = {
  args: {
    text: props.text,
    intent: 'secondary',
    src: '/projects',
  },
};

export const Outline: Story = {
  args: {
    text: props.text,
    intent: 'outline',
    src: '/projects',
  },
};

export const Accent: Story = {
  args: {
    text: props.text,
    intent: 'accent',
    src: '/projects',
  },
};
