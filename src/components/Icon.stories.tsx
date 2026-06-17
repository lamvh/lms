import type { Meta, StoryObj } from '@storybook/react';
import { Icon, ICON_NAMES } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Foundations/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: { size: 22, stroke: 1.7 },
  argTypes: {
    name: { control: 'select', options: ICON_NAMES },
    size: { control: { type: 'range', min: 12, max: 48, step: 1 } },
    stroke: { control: { type: 'range', min: 1, max: 3, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

/** Single icon, controllable via args. */
export const Single: Story = {
  args: { name: 'sparkle' },
};

/** Full stroke set, matching the Components page icon grid. */
export const AllGlyphs: Story = {
  render: (args) => (
    <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(110px,1fr))] max-w-wrap font-body text-ink-700">
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 px-1.5 py-3.5 rounded-sm bg-surface-2 text-ink-700"
        >
          <Icon {...args} name={name} />
          <span className="font-mono text-[10px] text-ink-400">{name}</span>
        </div>
      ))}
    </div>
  ),
};
