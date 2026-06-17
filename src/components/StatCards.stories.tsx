import type { Meta, StoryObj } from '@storybook/react';
import { StatCards } from './StatCards';

const meta: Meta<typeof StatCards> = {
  title: 'Composites/StatCards',
  component: StatCards,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="p-6 max-w-wrap">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof StatCards>;

export const Default: Story = {};
