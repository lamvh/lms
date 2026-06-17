import type { Meta, StoryObj } from '@storybook/react';
import { Field } from './Field';

const meta: Meta<typeof Field> = {
  title: 'Primitives/Field',
  component: Field,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[220px]">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = { args: { placeholder: 'Full name' } };
export const Error: Story = { args: { error: true, defaultValue: 'bad@email' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Locked field' } };

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[220px]">
      <Field placeholder="Full name" />
      <Field defaultValue="Nguyen Thi Mai" />
      <Field error defaultValue="bad@email" />
      <Field disabled defaultValue="Locked field" />
    </div>
  ),
};
