import type { Meta, StoryObj } from '@storybook/react';
import { ZoomPanel } from './ZoomPanel';
import { classes } from '../data/edunex';

const meta: Meta<typeof ZoomPanel> = {
  title: 'Composites/ZoomPanel',
  component: ZoomPanel,
  tags: ['autodocs'],
  args: { c: classes[0], notify: () => {} },
  decorators: [
    (Story) => (
      // Relative host so the edit Modal (absolute inset-0) is scoped here.
      <div className="relative w-full max-w-[540px] min-h-[320px]">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ZoomPanel>;

export const Default: Story = {};
