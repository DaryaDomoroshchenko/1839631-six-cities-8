/* eslint-disable camelcase */
import { nanoid } from 'nanoid';
import classNames, { Argument } from 'classnames';
import { CityName, MAX_RATING_VALUE, SortingTypes } from './const';
import { RoomOffer, RoomOfferServerModel } from './types/room-offer';
import Cities from './types/cities';
import { Review, ReviewServerModel } from './types/review';

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

const sortOffers = (type: SortingTypes, offers: RoomOffer[]): RoomOffer[] => {
  switch (type) {
    case SortingTypes.cheapFirst:
      return offers.sort((a, b) => a.price - b.price);
    case SortingTypes.expensiveFirst:
      return offers.sort((a, b) => b.price - a.price);
    case SortingTypes.topRated:
      return offers.sort((a, b) => b.rating - a.rating);
    case SortingTypes.popular:
      return offers;
  }
};

const adaptOffersToClient = (items: RoomOfferServerModel[]): RoomOffer[] => items.map(({
  is_favorite,
  is_premium,
  max_adults,
  preview_image,
  host: { avatar_url, is_pro, ...restHost },
  city: { name, ...restCity },
  ...restProps
}): RoomOffer => ({
  isFavorite: is_favorite,
  isPremium: is_premium,
  maxAdults: max_adults,
  previewImage: preview_image,
  host: {
    avatarUrl: avatar_url,
    isPro: is_pro,
    ...restHost,
  },
  city: {
    name: name as CityName,
    ...restCity,
  },
  ...restProps,
}));

const adaptReviewsToClient = (items: ReviewServerModel[]): Review[] => items.map(({
  user: { avatar_url, is_pro, ...restUser },
  ...restProps
}): Review => ({
  user: {
    avatarUrl: avatar_url,
    isPro: is_pro,
    ...restUser,
  },
  ...restProps,
}));

export {
  getRandomId,
  getClassNames,
  getRatingValue, convertDate,
  getCities,
  sortOffers,
  adaptOffersToClient,
  adaptReviewsToClient
};
