import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Segmented } from './Segmented';

const meta: Meta<typeof Segmented> = {
  title: 'Primitives/Segmented',
  component: Segmented,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Segmented>;

function ThreeOptions() {
  const [v, setV] = useState('week');
  return (
    <Segmented
      value={v}
      onChange={setV}
      options={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
      ]}
    />
  );
}

function SmallWithIcon() {
  const [v, setV] = useState('grid');
  return (
    <Segmented
      size="sm"
      value={v}
      onChange={setV}
      options={[
        { value: 'grid', label: 'Grid', icon: 'grid' },
        { value: 'list', label: 'List', icon: 'list' },
      ]}
    />
  );
}

export const ThreeOption: Story = { render: () => <ThreeOptions /> };
export const SmallIcon: Story = { render: () => <SmallWithIcon /> };

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-5 items-center">
      <ThreeOptions />
      <SmallWithIcon />
    </div>
  ),
};
