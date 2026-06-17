import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { Tag } from './Tag';
import { Icon } from './Icon';

const meta: Meta<typeof Chip> = {
  title: 'Primitives/Chip & Tag',
  component: Chip,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const ChipDefault: Story = {
  render: () => (
    <Chip>
      <Icon name="filter" size={14} />
      All levels
    </Chip>
  ),
};

export const ChipSelected: Story = { render: () => <Chip on>IELTS</Chip> };

export const Tags: Story = {
  render: () => (
    <div className="flex gap-1.5">
      <Tag>Grammar</Tag>
      <Tag>Speaking</Tag>
      <Tag>B2</Tag>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3.5 items-center">
      <Chip>
        <Icon name="filter" size={14} />
        All levels
      </Chip>
      <Chip on>IELTS</Chip>
      <Tag>B2</Tag>
      <span className="flex gap-1.5">
        <Tag>Grammar</Tag>
        <Tag>Speaking</Tag>
      </span>
    </div>
  ),
};
