import { defineConfig } from '@szelenov/tutorialkit-theme';

export default defineConfig({
  // required for TutorialKit monorepo development mode
  content: {
    pipeline: {
      include: '**',
    },
  },
});
