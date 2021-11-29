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
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum MapLayerParam {
  Url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Attr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
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
  Popular = 'Popular',
  CheapFirst = 'Price: low to high',
  ExpensiveFirst = 'Price: high to low',
  TopRated = 'Top rated first',
}

enum MapIconUrl {
  Default = 'img/pin.svg',
  Active = 'img/pin-active.svg',
}

enum MapIconSize {
  Width = 40,
  Height = 40,
}

enum OfferRatingTitle {
  Perfect = 'perfect',
  Good = 'good',
  NotBad = 'not bad',
  Badly = 'badly',
  Terribly = 'terribly',
}

const OfferRatingValues = {
  [OfferRatingTitle.Perfect] : 5,
  [OfferRatingTitle.Good]: 4,
  [OfferRatingTitle.NotBad]: 3,
  [OfferRatingTitle.Badly]: 2,
  [OfferRatingTitle.Terribly]: 1,
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
