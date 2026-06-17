/** "18:30" → "6:30pm" (ported from the prototype's to12 helper). */
export function to12(t: string): string {
  const [hRaw, m] = t.split(':').map(Number);
  const ap = hRaw >= 12 ? 'pm' : 'am';
  const h = hRaw % 12 || 12;
  return `${h}:${m.toString().padStart(2, '0')}${ap}`;
}
