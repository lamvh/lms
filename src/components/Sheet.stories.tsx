import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sheet } from './Sheet';
import { Button } from './Button';

const meta: Meta<typeof Sheet> = {
  title: 'Primitives/Sheet',
  component: Sheet,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Sheet>;

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    // Relative host: Sheet overlay is absolute inset-0, scoped to this frame.
    <div className="relative w-[380px] min-h-[300px] overflow-hidden rounded-md bg-surface-3">
      <div className="p-6">
        <Button variant="soft" size="sm" onClick={() => setOpen(true)}>
          Open sheet
        </Button>
      </div>
      <Sheet open={open} onClose={() => setOpen(false)} title="Lesson options">
        <div className="flex flex-col gap-2">
          {['Join Zoom', 'Download materials', 'Mark attendance'].map((t) => (
            <Button key={t} variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
              {t}
            </Button>
          ))}
        </div>
      </Sheet>
    </div>
  );
}

export const Default: Story = { render: () => <Demo /> };
