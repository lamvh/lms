import type { Meta, StoryObj } from '@storybook/react';

/**
 * Foundations · section 01 of the EduNex Components build contract.
 * Documentation-only stories (no product component) — color scales, typography,
 * radii and shadows. Token hex values mirror the Components page arrays.
 */

const PRIMARY: [string, string][] = [
  ['p-900', '#15171C'], ['p-800', '#1C1F26'], ['p-700', '#242832'], ['p-600', '#333845'],
  ['p-500', '#474D5A'], ['p-400', '#6E7480'], ['p-300', '#A2A7B1'], ['p-200', '#D5D8DE'],
  ['p-100', '#E9E6DE'], ['p-50', '#F6F3EC'],
];
const ACCENT: [string, string][] = [
  ['a-700', '#B07E00'], ['a-600', '#D29900'], ['a-500', '#F2B400'],
  ['a-400', '#FFC93D'], ['a-100', '#FFEFC2'], ['a-50', '#FFF9E8'],
];
const SURF: [string, string][] = [
  ['ink-900', '#191B20'], ['ink-700', '#383D46'], ['ink-500', '#646A75'], ['ink-400', '#8B909B'],
  ['ink-300', '#AEB2BB'], ['line', '#E9E4D9'], ['bg', '#F6F3EC'], ['surface', '#FFFFFF'],
  ['surface-2', '#FBF8F1'], ['surface-3', '#F1ECE1'],
];
const STATUS: [string, string][] = [
  ['success', '#2E9E6B'], ['success-bg', '#DFF2E8'], ['warn', '#C9821F'], ['warn-bg', '#FBF1E0'],
  ['danger', '#D55B43'], ['danger-bg', '#FBE7E2'], ['info', '#2A6298'], ['info-bg', '#E5EEF6'],
  ['zalo', '#0068FF'], ['zalo-bg', '#E5F0FF'],
];

function Swatch({ nm, hx }: { nm: string; hx: string }) {
  return (
    <div className="w-[104px]">
      <div
        className="h-[54px] rounded-sm border border-black/[.06] shadow-sh-1"
        style={{ background: hx }}
      />
      <div className="font-mono text-[11px] text-ink-700 mt-[7px] font-medium">{nm}</div>
      <div className="font-mono text-[10.5px] text-ink-400 mt-px">{hx}</div>
    </div>
  );
}

function Row({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <section className="mb-8">
      <h3 className="font-head text-sm font-bold text-ink-900 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2.5">
        {items.map(([nm, hx]) => (
          <Swatch key={nm} nm={nm} hx={hx} />
        ))}
      </div>
    </section>
  );
}

const meta: Meta = {
  title: 'Foundations/Overview',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Colors: Story = {
  render: () => (
    <div className="max-w-wrap mx-auto p-10 font-body">
      <Row title="Primary · warm charcoal" items={PRIMARY} />
      <Row title="Accent · EduNex gold" items={ACCENT} />
      <Row title="Surfaces & neutrals" items={SURF} />
      <Row title="Status" items={STATUS} />
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="max-w-wrap mx-auto p-10 font-body">
      {[
        ['Bricolage · 46 / 700', <span key="a" className="font-head text-[46px] font-bold tracking-[-.02em] text-ink-900">Learn More</span>],
        ['Head · 24 / 700', <span key="b" className="font-head text-2xl font-bold text-ink-900">Class dashboard</span>],
        ['Body · 15 / 500', <span key="c" className="font-body text-[15px] font-medium text-ink-700">English plus career coaching for Vietnamese learners in New Zealand.</span>],
        ['Eyebrow · 11 / 700', <span key="d" className="font-head text-[11px] font-bold tracking-[.16em] uppercase text-a-700">Starting soon</span>],
        ['Mono · 12', <span key="e" className="font-mono text-xs text-ink-500">props · variant · token</span>],
      ].map(([meta, demo], i) => (
        <div key={i} className="flex items-baseline gap-5 py-3 border-b border-line-soft last:border-b-0">
          <span className="font-mono text-[11px] text-ink-400 w-40 shrink-0">{meta as string}</span>
          {demo}
        </div>
      ))}
    </div>
  ),
};

// Explicit class strings (not interpolated) so Tailwind's JIT keeps them.
const RADII: [string, string][] = [
  ['r-xs', 'rounded-xs'], ['r-sm', 'rounded-sm'], ['r-md', 'rounded-md'],
  ['r-lg', 'rounded-lg'], ['r-xl', 'rounded-xl'], ['r-pill', 'rounded-pill'],
];
const SHADOWS: [string, string][] = [
  ['sh-1', 'shadow-sh-1'], ['sh-2', 'shadow-sh-2'],
  ['sh-card', 'shadow-sh-card'], ['sh-pop', 'shadow-sh-pop'],
];

export const RadiiAndShadow: Story = {
  render: () => (
    <div className="max-w-wrap mx-auto p-10 font-body">
      <h3 className="font-head text-sm font-bold text-ink-900 mb-3">Radii</h3>
      <div className="flex flex-wrap gap-3.5 items-end mb-8">
        {RADII.map(([label, cls]) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className={`w-[62px] h-[62px] bg-a-100 border border-a-400 ${cls}`} />
            <span className="font-mono text-[10.5px] text-ink-400">{label}</span>
          </div>
        ))}
      </div>
      <h3 className="font-head text-sm font-bold text-ink-900 mb-3">Shadow</h3>
      <div className="flex flex-wrap gap-5 items-end">
        {SHADOWS.map(([label, cls]) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className={`w-[120px] h-[62px] bg-surface rounded-md ${cls}`} />
            <span className="font-mono text-[10.5px] text-ink-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
