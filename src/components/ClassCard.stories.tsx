import type { Meta, StoryObj } from '@storybook/react';
import { ClassCard } from './ClassCard';
import { classes } from '../data/edunex';

const C_ACTIVE = classes[0];
const C_SOON = classes.find((c) => c.status === 'soon') || classes[0];
const C_PAUSED = classes.find((c) => c.status === 'paused') || classes[0];
const noop = () => {};

const meta: Meta<typeof ClassCard> = {
  title: 'Composites/ClassCard',
  component: ClassCard,
  tags: ['autodocs'],
  args: { openClass: noop, notify: noop },
  decorators: [
    (Story) => (
      <div className="w-[282px]">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ClassCard>;

export const Active: Story = { args: { c: C_ACTIVE } };
export const StartingSoon: Story = { args: { c: C_SOON } };
export const Paused: Story = { args: { c: C_PAUSED } };

export const AllStates: Story = {
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="flex gap-4 items-start">
      {[C_ACTIVE, C_SOON, C_PAUSED].map((c) => (
        <div key={c.id} className="w-[282px]">
          <ClassCard c={c} openClass={noop} notify={noop} />
        </div>
      ))}
    </div>
  ),
};
