export type AuthData = {
  login: string,
  password: string,
}

export type CurrentUser = {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string,
  token: string,
}
