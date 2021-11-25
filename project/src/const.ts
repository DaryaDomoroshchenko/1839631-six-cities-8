const MAX_RATING_VALUE = 5;
const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  RoomPage = '/offer',
}

enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Offers = '/hotels',
  SuggestedOffers = '/nearby',
  FavoriteOffers = '/favorite',
  Reviews = '/comments',
}

enum AuthStatus {
  auth = 'AUTH',
  noAuth = 'NO_AUTH',
  unknown = 'UNKNOWN',
}

enum MapLayerParam {
  url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  attr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
}

enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

enum SortingType {
  popular = 'Popular',
  cheapFirst = 'Price: low to high',
  expensiveFirst = 'Price: high to low',
  topRated = 'Top rated first',
}

enum MapIconUrl {
  default = 'img/pin.svg',
  active = 'img/pin-active.svg',
}

enum MapIconSize {
  width = 40,
  height = 40,
}

enum OfferRatingTitle {
  perfect = 'perfect',
  good = 'good',
  notBad = 'not bad',
  badly = 'badly',
  terribly = 'terribly',
}

const OfferRatingValues = {
  [OfferRatingTitle.perfect] : 5,
  [OfferRatingTitle.good]: 4,
  [OfferRatingTitle.notBad]: 3,
  [OfferRatingTitle.badly]: 2,
  [OfferRatingTitle.terribly]: 1,
};

export {
  MAX_RATING_VALUE,
  AUTH_TOKEN_KEY_NAME,
  MapLayerParam,
  AppRoute,
  APIRoute,
  AuthStatus,
  CityName,
  SortingType,
  MapIconUrl,
  MapIconSize,
  OfferRatingTitle,
  OfferRatingValues
};
