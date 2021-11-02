import { nanoid } from 'nanoid';
import classNames, { Argument } from 'classnames';
import { MAX_RATING_VALUE } from './const';
import { RoomOffer } from './types/room-offer';
import Cities from './types/cities';

const getRandomId = (): string => nanoid();

const getClassNames = (...args: Argument[]): string => classNames(args);

const getRatingValue = (rating: number): string => `${(100 / MAX_RATING_VALUE) * rating}%`;

const convertDate = (date: string): string =>
  new Date(date).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

const getCities = (offers: RoomOffer[]): Cities => {
  const cities = offers.reduce<Cities>((acc, offer: RoomOffer) => {
    const { name, location } = offer.city;

    if (!acc[name]) {
      acc[name] = location;
    }

    return acc;
  }, {});

  return cities;
};

export { getRandomId, getClassNames, getRatingValue, convertDate, getCities };
