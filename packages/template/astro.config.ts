import tutorialkit from '@szelenov/tutorialkit-astro';
import { defineConfig } from 'astro/config';

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [tutorialkit()],
});
