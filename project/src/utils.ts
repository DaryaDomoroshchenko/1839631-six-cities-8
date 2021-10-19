import { nanoid } from 'nanoid';
import classNames, { Argument } from 'classnames';
import { MAX_RATING_VALUE } from './const';

const getRandomId = (): string => nanoid();

const getClassNames = (...args: Argument[]): string => classNames(args);

const getRatingValue = (rating: number): string => `${(100 / MAX_RATING_VALUE) * rating}%`;

const convertDate = (date: string): string =>
  new Date(date).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

export { getRandomId, getClassNames, getRatingValue, convertDate };
