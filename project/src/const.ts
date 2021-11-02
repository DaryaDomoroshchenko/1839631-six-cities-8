const MAX_RATING_VALUE = 5;
const LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const LAYER_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  RoomPage = '/offer',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

enum MapIconUrl {
  Default = 'img/pin.svg',
  Active = 'img/pin-active.svg',
}

enum MapIconSize {
  Width = 40,
  Height = 40,
}

export {
  MAX_RATING_VALUE,
  LAYER_URL,
  LAYER_ATTR,
  AppRoute,
  AuthorizationStatus,
  CityName,
  MapIconUrl,
  MapIconSize
};
