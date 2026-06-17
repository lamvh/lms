import type { Preview } from '@storybook/react';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'cream',
      values: [
        { name: 'cream', value: '#F6F3EC' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'charcoal', value: '#15171C' },
      ],
    },
  },
};

export default preview;
