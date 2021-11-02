import Review from '../types/review';

export const reviews: Review[] = [
  {
    id: 1,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-05-08T14:13:56.569Z',
    rating: 4,
    user: {
      avatarUrl: '../../img/avatar-max.jpg',
      id: 4,
      isPro: false,
      name: 'Max',
    },
  },
  {
    id: 2,
    comment: 'A nice room in Amsterdam center.',
    date: '2019-09-11T14:13:56.569Z',
    rating: 4.8,
    user: {
      avatarUrl: '../../img/avatar-max.jpg',
      id: 3,
      isPro: false,
      name: 'Jack',
    },
  },
];
