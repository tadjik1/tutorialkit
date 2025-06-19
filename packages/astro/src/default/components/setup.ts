/**
 * This code must be executed before WebContainer boots and be executed as soon as possible.
 * This ensures that when the authentication flow is complete in a popup, the popup is closed quickly.
 */
import { authStore } from '../stores/auth-store.js';

const devUser = {
  displayName: 'John Doe',
  profileName: 'john-doe',
  photo: 'https://avatars0.githubusercontent.com/u/1452895?v=4',
  solved: [],
};

export async function checkUserAuth() {
  try {
    if (import.meta.env.PROD) {
      const courseId = window.location.pathname.split('/').at(0);
      const res = await fetch(`/profile/me?include_enrollments=true&course=${courseId}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('unauthorized');

      const profile = await res.json();
      authStore.set({ user: profile });
    } else {
      authStore.set({ user: devUser });
    }
  } catch {
    window.location.href = '/auth/login';
  }
}
