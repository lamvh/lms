import type { Meta, StoryObj } from '@storybook/react';
import { FileIcon, type FileType } from './FileIcon';

const meta: Meta<typeof FileIcon> = {
  title: 'Primitives/FileIcon',
  component: FileIcon,
  tags: ['autodocs'],
  args: { type: 'pdf', size: 42 },
};
export default meta;
type Story = StoryObj<typeof FileIcon>;

const TYPES: FileType[] = ['pdf', 'doc', 'slides', 'audio', 'video', 'image', 'link'];

export const Single: Story = {};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3.5 items-center">
      {TYPES.map((t) => (
        <div key={t} className="flex flex-col items-center gap-2">
          <FileIcon type={t} />
          <span className="font-mono text-[10.5px] text-ink-400">{t}</span>
        </div>
      ))}
    </div>
  ),
};
