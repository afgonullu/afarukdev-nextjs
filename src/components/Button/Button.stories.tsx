import type { Meta, StoryObj } from '@storybook/react';

import type { IButtonProps } from './Button';
import Button from './Button';

const props: IButtonProps = {
  text: 'Learn More',
  onClick: () => {},
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
    onClick: props.onClick,
  },
};

export const Secondary: Story = {
  args: {
    text: props.text,
    intent: 'secondary',
    onClick: props.onClick,
  },
};

export const Outline: Story = {
  args: {
    text: props.text,
    intent: 'outline',
    onClick: props.onClick,
  },
};

export const Accent: Story = {
  args: {
    text: props.text,
    intent: 'accent',
    onClick: props.onClick,
  },
};
