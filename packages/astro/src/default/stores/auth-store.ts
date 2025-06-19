import { atom } from 'nanostores';
import type { User } from '@szelenov/tutorialkit-types';

type AuthStore = { user?: User };

export const authStore = atom<AuthStore>({});
