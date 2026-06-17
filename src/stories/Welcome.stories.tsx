import type { Meta, StoryObj } from '@storybook/react';

/**
 * Smoke story verifying Storybook renders with Tailwind tokens + fonts.
 * Replaced by real Foundations/component stories in later phases.
 */
function Welcome() {
  return (
    <div className="max-w-wrap mx-auto p-10 font-body text-ink-700">
      <p className="font-head text-xs font-bold tracking-[.16em] uppercase text-a-700">
        EduNex LMS · Storybook
      </p>
      <h1 className="font-head text-[46px] font-bold tracking-[-.02em] text-ink-900 mt-2">
        Learn More
      </h1>
      <div className="flex gap-3 mt-6">
        <span className="px-4 py-2 rounded-md bg-a-500 text-ink-900 font-head font-semibold shadow-sh-pop">
          Gold accent
        </span>
        <span className="px-4 py-2 rounded-md bg-p-900 text-white font-head font-semibold">
          Charcoal
        </span>
        <span className="px-4 py-2 rounded-md bg-surface border border-line text-ink-600 font-mono text-sm">
          tokens · ok
        </span>
      </div>
    </div>
  );
}

const meta: Meta<typeof Welcome> = {
  title: 'Welcome',
  component: Welcome,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const Default: Story = {};
