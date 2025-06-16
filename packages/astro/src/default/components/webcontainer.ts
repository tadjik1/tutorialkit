import { checkUserAuth } from './setup.js';
import { safeBoot, TutorialStore } from '@szelenov/tutorialkit-runtime';
import { WebContainer } from '@webcontainer/api';
import { joinPaths } from '../utils/url.js';

interface WebContainerContext {
  loaded: boolean;
}

export let webcontainer: Promise<WebContainer> = new Promise(() => {
  // noop for ssr
});

if (!import.meta.env.SSR) {
  webcontainer = checkUserAuth().then(() => safeBoot({ workdirName: 'tutorial' }));

  webcontainer.then(() => {
    webcontainerContext.loaded = true;
  });
}

export const tutorialStore = new TutorialStore({
  webcontainer,
  basePathname: joinPaths(import.meta.env.BASE_URL, '/'),
});

export const webcontainerContext: WebContainerContext = {
  loaded: false,
};
