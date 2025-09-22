import HomeActiveIcon from '@/assets/icons/home-active.svg?react';
import HomeInactiveIcon from '@/assets/icons/home-inactive.svg?react';
import SearchActiveIcon from '@/assets/icons/search-active.svg?react';
import SearchInactiveIcon from '@/assets/icons/search-inactive.svg?react';
import QnAActiveIcon from '@/assets/icons/qna-active.svg?react';
import QnAInactiveIcon from '@/assets/icons/qna-inactive.svg?react';
import MagazineActiveIcon from '@/assets/icons/magazine-active.svg?react';
import MagazineInactiveIcon from '@/assets/icons/magazine-inactive.svg?react';
import QuizActiveIcon from '@/assets/icons/quiz-active.svg?react';
import QuizInactiveIcon from '@/assets/icons/quiz-inactive.svg?react';

const TABS = [
  {
    activeIcon: HomeActiveIcon,
    inactiveIcon: HomeInactiveIcon,
    label: '홈',
    path: '/',
  },
  {
    activeIcon: SearchActiveIcon,
    inactiveIcon: SearchInactiveIcon,
    label: '검색',
    path: '/search',
  },
  {
    activeIcon: QnAActiveIcon,
    inactiveIcon: QnAInactiveIcon,
    label: '지식인',
    path: '/qna',
  },
  {
    activeIcon: MagazineActiveIcon,
    inactiveIcon: MagazineInactiveIcon,
    label: '매거진',
    path: '/magazine',
  },
  {
    activeIcon: QuizActiveIcon,
    inactiveIcon: QuizInactiveIcon,
    label: '퀴즈',
    path: '/quiz',
  },
];

export default TABS;
