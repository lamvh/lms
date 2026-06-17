import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Field } from './Field';

const meta: Meta<typeof Modal> = {
  title: 'Primitives/Modal',
  component: Modal,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Modal>;

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    // Relative host: Modal overlay is absolute inset-0, scoped to this frame.
    <div className="relative w-full min-h-[260px] overflow-hidden rounded-md bg-surface-3">
      <div className="p-6">
        <Button size="sm" onClick={() => setOpen(true)}>
          Open modal
        </Button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add a student"
        sub="Enrol a learner into a class"
        width={420}
      >
        <Field placeholder="Full name" className="mb-3" />
        <Field placeholder="Email" />
        <div className="flex gap-2.5 mt-[18px] justify-end">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={() => setOpen(false)}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export const Default: Story = { render: () => <Demo /> };
