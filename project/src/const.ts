export enum AppRoute {
  Main = '/',
  LogIn = '/login',
  Favorites = '/favorites',
  RoomOffer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
