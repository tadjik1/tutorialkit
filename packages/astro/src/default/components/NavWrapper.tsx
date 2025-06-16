import { Nav } from '@szelenov/tutorialkit-react';
import type { Lesson, NavList } from '@szelenov/tutorialkit-types';

interface Props {
  lesson: Lesson;
  navList: NavList;
}

export function NavWrapper(props: Props) {
  return <Nav {...props} />;
}
