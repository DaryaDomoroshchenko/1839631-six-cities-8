const MAX_RATING_VALUE = 5;
const LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const LAYER_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  RoomPage = '/offer',
}

enum APIRoute {
  Offers = '/hotels',
  SuggestedOffers = '/nearby',
  Login = '/login',
  Logout = '/logout',
}

enum AuthStatus {
  auth = 'AUTH',
  noAuth = 'NO_AUTH',
  unknown = 'UNKNOWN',
}

enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

enum SortingTypes {
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

export {
  MAX_RATING_VALUE,
  LAYER_URL,
  LAYER_ATTR,
  AppRoute,
  APIRoute,
  AuthStatus,
  CityName,
  SortingTypes,
  MapIconUrl,
  MapIconSize
};
