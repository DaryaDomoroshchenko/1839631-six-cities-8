const MAX_RATING_VALUE = 5;
const LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const LAYER_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  RoomPage = '/offer',
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

enum MapIconUrl {
  default = 'img/pin.svg',
  active = 'img/pin-active.svg',
}

enum MapIconSize {
  width = 40,
  height = 40,
}

enum RoomCardType {
  main = 'main',
  roomPage = 'roomPage',
}

export {
  MAX_RATING_VALUE,
  LAYER_URL,
  LAYER_ATTR,
  AppRoute,
  AuthStatus,
  CityName,
  MapIconUrl,
  MapIconSize,
  RoomCardType
};
