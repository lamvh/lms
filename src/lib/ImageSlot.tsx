import type { CSSProperties } from 'react';

export interface ImageSlotProps {
  /** Stable id so the slot keeps its image across renders. */
  id?: string;
  /** Image URL to display. */
  src?: string;
  /** Frame shape: 'rounded' (default) | 'circle' | 'pill' | 'square'. */
  shape?: string;
  /** Corner radius (px) when shape is 'rounded'. */
  radius?: string | number;
  /** Object-fit: 'cover' (default) | 'contain'. */
  fit?: string;
  /** Object-position, e.g. '50% 50%'. */
  position?: string;
  /** Empty-state caption. */
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  alt?: string;
}

/**
 * Typed React wrapper around the <image-slot> custom element
 * (registered by public/image-slot.js, loaded once in index.html).
 * In the design runtime the slot is drag-and-drop editable; here it
 * simply renders the provided `src` inside its framed shape.
 */
export function ImageSlot({
  id,
  src,
  shape = 'rounded',
  radius,
  fit,
  position,
  placeholder,
  className,
  style,
  alt,
}: ImageSlotProps) {
  return (
    <image-slot
      id={id}
      src={src}
      shape={shape}
      radius={radius}
      fit={fit}
      position={position}
      placeholder={placeholder}
      aria-label={alt}
      // React 18 forwards `class` (not `className`) to unknown custom elements.
      class={className}
      style={style}
    />
  );
}

export default ImageSlot;
