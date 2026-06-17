import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)', '../src/**/*.mdx'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Serve public/ so <image-slot> and bundled assets are available in stories.
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag',
  },
};

export default config;
