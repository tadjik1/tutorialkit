import { useStore } from '@nanostores/react';
import { WorkspacePanel } from '@szelenov/tutorialkit-react';
import type { Lesson } from '@szelenov/tutorialkit-types';
import { useEffect } from 'react';
import { Dialog } from 'tutorialkit:override-components';
import { themeStore } from '../stores/theme-store.js';
import { tutorialStore } from './webcontainer.js';
import { authStore } from '../stores/auth-store';

interface Props {
  tutorialId: string;
  lesson: Lesson;
}

export function WorkspacePanelWrapper({ tutorialId, lesson }: Props) {
  const theme = useStore(themeStore);
  const authStatus = useStore(authStore);
  const user = authStatus.user!;

  useEffect(() => {
    tutorialStore.setLesson(lesson);
  }, [lesson]);

  if (import.meta.env.SSR || !tutorialStore.lesson) {
    tutorialStore.setTutorialId(tutorialId);
    tutorialStore.setLesson(lesson, { ssr: import.meta.env.SSR });
  }

  return <WorkspacePanel dialog={Dialog} tutorialStore={tutorialStore} theme={theme} user={user} />;
}
