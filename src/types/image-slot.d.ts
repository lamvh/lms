import type { CSSProperties, ReactNode } from 'react';

/** Attributes the <image-slot> custom element observes (see public/image-slot.js). */
interface ImageSlotAttributes {
  id?: string;
  shape?: string;
  radius?: string | number;
  mask?: string;
  fit?: string;
  position?: string;
  placeholder?: string;
  src?: string;
  /** React 18 forwards `class` (not `className`) to unknown custom elements. */
  class?: string;
  style?: CSSProperties;
  'aria-label'?: string;
  children?: ReactNode;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'image-slot': ImageSlotAttributes;
    }
  }
}

export {};
