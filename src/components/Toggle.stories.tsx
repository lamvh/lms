import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Toggle>;

function Demo({ start, size }: { start: boolean; size?: number }) {
  const [on, setOn] = useState(start);
  return <Toggle on={on} onChange={setOn} size={size} />;
}

export const Off: Story = { render: () => <Demo start={false} /> };
export const On: Story = { render: () => <Demo start /> };

export const AllStates: Story = {
  render: () => (
    <div className="flex items-center gap-5">
      <Demo start={false} />
      <Demo start />
      <Demo start size={20} />
      <Demo start={false} size={32} />
    </div>
  ),
};
