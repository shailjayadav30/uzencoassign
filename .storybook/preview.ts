import type { Preview } from '@storybook/react-vite'
import "../src/index.css";  
import { themes } from 'storybook/internal/theming';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
     darkMode: {
    current: 'light',   // default start in light
    dark: themes.dark,  // Storybook dark theme
    light: themes.light // Storybook light theme
  },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;