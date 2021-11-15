import { nanoid } from 'nanoid';
import classNames, { Argument } from 'classnames';
import { CityName, MAX_RATING_VALUE, SortingTypes } from './const';
import { RoomOffer, RoomOfferServerModel } from './types/room-offer';
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

const adaptOffersToClient = (items: RoomOfferServerModel[]): RoomOffer[] => items.map((item): RoomOffer => {
  const adaptedOffer: RoomOffer = Object.assign(
    {},
    item,
    {
      isFavorite: item.is_favorite,
      isPremium: item.is_premium,
      maxAdults: item.max_adults,
      previewImage: item.preview_image,
      host: Object.assign({}, item.host, { isPro: item.host.is_pro, avatarUrl: item.host.avatar_url }),
      city: Object.assign({}, item.city, { name: item.city.name as CityName }),
    },
  );

  delete adaptedOffer.is_favorite;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.max_adults;
  delete adaptedOffer.preview_image;

  delete adaptedOffer.host.avatar_url;
  delete adaptedOffer.host.is_pro;

  return adaptedOffer;
});

export {
  getRandomId,
  getClassNames,
  getRatingValue, convertDate,
  getCities,
  sortOffers,
  adaptOffersToClient
};
