import type { Meta, StoryObj } from '@storybook/react';
import { SessionCard, type SessionView } from './SessionCard';
import { classes } from '../data/edunex';

const C_ACTIVE = classes[0];
const SESS: SessionView = { ...C_ACTIVE.schedule[0], class: C_ACTIVE };
const noop = () => {};

const meta: Meta<typeof SessionCard> = {
  title: 'Composites/SessionCard',
  component: SessionCard,
  tags: ['autodocs'],
  args: { s: SESS, open: noop },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof SessionCard>;

export const NextUp: Story = { args: { i: 0 } };
export const Later: Story = { args: { i: 1 } };
