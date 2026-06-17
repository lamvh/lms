import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Jane Pham', size: 44 },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};
export const Ring: Story = { args: { name: 'Ms Jane', color: '#F2B400', ring: true } };
export const Initials: Story = { args: { name: undefined, short: 'EN', color: '#2A6298' } };

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-3.5">
      <Avatar name="Jane Pham" size={28} />
      <Avatar name="Tran Bao" size={38} color="#2E9E6B" />
      <Avatar name="Le Minh Anh" size={52} color="#8A5A86" />
      <Avatar name="Ms Jane" size={44} color="#F2B400" ring />
      <Avatar short="EN" size={44} color="#2A6298" />
    </div>
  ),
};
