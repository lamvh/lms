import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Primitives/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Active: Story = { args: { status: 'active' } };
export const Soon: Story = { args: { status: 'soon' } };
export const Paused: Story = { args: { status: 'paused' } };
export const Warn: Story = { args: { status: 'warn' } };

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3.5 items-center">
      <StatusBadge status="active" />
      <StatusBadge status="soon" />
      <StatusBadge status="paused" />
      <StatusBadge status="warn" />
    </div>
  ),
};
