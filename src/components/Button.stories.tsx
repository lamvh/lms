import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Icon } from './Icon';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Save class' },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Cancel' } };
export const Soft: Story = { args: { variant: 'soft', children: 'Details' } };
export const Zalo: Story = {
  args: {
    variant: 'zalo',
    children: (
      <>
        <Icon name="zalo" size={16} />
        Zalo
      </>
    ),
  },
};
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon name="plus" size={16} />
        Add student
      </>
    ),
  },
};
export const IconOnly: Story = {
  args: { variant: 'ghost', iconOnly: true, children: <Icon name="more" size={18} /> },
};
export const Small: Story = { args: { size: 'sm', children: 'Invite' } };
export const Loading: Story = { args: { loading: true, children: 'Saving' } };
export const Disabled: Story = { args: { disabled: true } };

/** All states side by side, mirroring the Components page Button block. */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3.5 items-center font-body">
      <Button variant="primary">Save class</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="soft">Details</Button>
      <Button variant="zalo">
        <Icon name="zalo" size={16} />
        Zalo
      </Button>
      <Button>
        <Icon name="plus" size={16} />
        Add student
      </Button>
      <Button variant="ghost" iconOnly>
        <Icon name="more" size={18} />
      </Button>
      <Button size="sm">Invite</Button>
      <Button loading>Saving</Button>
      <Button disabled>Save class</Button>
    </div>
  ),
};
