import { fileURLToPath, URL } from 'node:url';
import { expect, test } from 'vitest';
import { getInlineContentForPackage } from './index.js';

const root = fileURLToPath(new URL('../../template', import.meta.url));

test('getInlineContentForPackage finds files from @szelenov/tutorialkit-astro', () => {
  const content = getInlineContentForPackage({
    name: '@szelenov/tutorialkit-astro',
    pattern: '/dist/default/**/*.astro',
    root,
  });

  expect(content.length).toBeGreaterThan(0);
});
