import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Composites/Logo',
  component: Logo,
  tags: ['autodocs'],
  args: { size: 34 },
};
export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {};
export const MarkOnly: Story = { args: { showText: false } };
export const Small: Story = { args: { size: 24 } };
export const Large: Story = { args: { size: 48 } };
export const LightOnDark: Story = {
  args: { light: true },
  decorators: [
    (Story) => (
      <div className="bg-p-900 px-[18px] py-3.5 rounded-md inline-block">
        <Story />
      </div>
    ),
  ],
};
