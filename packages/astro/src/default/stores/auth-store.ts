import { atom } from 'nanostores';

interface User {
  displayName: string;
  profileName: string;
  photo: string;
}

type AuthStore = { user?: User };

export const authStore = atom<AuthStore>({});
