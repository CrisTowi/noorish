import type { Preview } from '@storybook/nextjs-vite'
import '../styles/tokens.css'
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: '#FAFAF7' },
        { name: 'sand', value: '#F5F0E8' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
};

export default preview;