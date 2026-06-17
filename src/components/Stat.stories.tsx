import type { Meta, StoryObj } from '@storybook/react';
import { Stat } from './Stat';

const meta: Meta<typeof Stat> = {
  title: 'Primitives/Stat',
  component: Stat,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[200px]">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Stat>;

export const Brand: Story = {
  args: { icon: 'students', label: 'Active students', value: '248', sub: '+12', tone: 'brand' },
};
export const Green: Story = {
  args: { icon: 'check', label: 'Attendance', value: '94%', sub: '+3%', tone: 'green' },
};
export const Amber: Story = {
  args: { icon: 'clock', label: 'To mark', value: '17', tone: 'amber' },
};
export const Plum: Story = {
  args: { icon: 'star', label: 'Avg score', value: '7.5', tone: 'plum' },
};

export const AllTones: Story = {
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="grid grid-cols-4 gap-3.5 w-[860px]">
      <Stat icon="students" label="Active students" value="248" sub="+12" tone="brand" />
      <Stat icon="check" label="Attendance" value="94%" sub="+3%" tone="green" />
      <Stat icon="clock" label="To mark" value="17" tone="amber" />
      <Stat icon="star" label="Avg score" value="7.5" tone="plum" />
    </div>
  ),
};
