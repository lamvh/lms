import { Icon, type IconName } from './Icon';

export type FileType = 'pdf' | 'doc' | 'slides' | 'audio' | 'video' | 'image' | 'link';

export const FILE_META: Record<
  FileType,
  { c: string; bg: string; label: string; icon: IconName }
> = {
  pdf: { c: '#CF5742', bg: '#FBE9E5', label: 'PDF', icon: 'file' },
  doc: { c: '#2A6298', bg: '#E1ECF6', label: 'DOC', icon: 'file' },
  slides: { c: '#C9821F', bg: '#FBF1E0', label: 'PPT', icon: 'image' },
  audio: { c: '#8A5A86', bg: '#F2E9F1', label: 'AUDIO', icon: 'audio' },
  video: { c: '#4C5FB0', bg: '#E8EAF6', label: 'VIDEO', icon: 'video' },
  image: { c: '#1E8A8A', bg: '#DCF0F0', label: 'IMG', icon: 'image' },
  link: { c: '#0068FF', bg: '#E5F0FF', label: 'LINK', icon: 'link' },
};

export interface FileIconProps {
  type?: FileType;
  size?: number;
}

/** Type-colored chip for a material or attachment. */
export function FileIcon({ type = 'pdf', size = 42 }: FileIconProps) {
  const m = FILE_META[type] || FILE_META.pdf;
  return (
    <div
      className="flex items-center justify-center shrink-0 rounded-md"
      style={{ width: size, height: size, background: m.bg, color: m.c }}
    >
      <Icon name={m.icon} size={size * 0.5} />
    </div>
  );
}

export default FileIcon;
