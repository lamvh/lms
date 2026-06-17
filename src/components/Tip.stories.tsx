import type { Meta, StoryObj } from '@storybook/react';
import { Tip } from './Tip';
import { Button } from './Button';
import { Icon } from './Icon';

const meta: Meta<typeof Tip> = {
  title: 'Primitives/Tip',
  component: Tip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="pt-12">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Tip>;

export const Default: Story = {
  args: {
    label: 'Send a reminder',
    children: (
      <Button variant="ghost" iconOnly>
        <Icon name="bell" size={18} />
      </Button>
    ),
  },
};
