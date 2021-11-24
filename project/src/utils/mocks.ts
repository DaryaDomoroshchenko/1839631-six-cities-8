import { address, datatype, lorem, image, name, random, date, internet } from 'faker';
import { AuthStatus, CityName, SortingTypes } from '../const';
import { RootState } from '../store/root-reducer';
import { AuthData, CurrentUser } from '../types/auth-data';
import Cities from '../types/cities';
import { Review, ReviewServerModel } from '../types/review';
import { MapLocation, RoomOffer, RoomOfferServerModel, User, UserServerModel } from '../types/room-offer';
import { appState, dataState, userState } from '../types/state';

const makeMapLocationMock = (): MapLocation => ({
  latitude: parseFloat(address.latitude()),
  longitude: parseFloat(address.longitude()),
  zoom: datatype.number(15),
});

const makeUserMock = (): User => ({
  avatarUrl: image.avatar(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.findName(),
});

const makeOfferMock = (): RoomOffer => ({
  id: datatype.number(),
  title: lorem.sentence(),
  type: lorem.word(),
  bedrooms: datatype.number(),
  city: {
    location: makeMapLocationMock(),
    name: CityName.Amsterdam,
  },
  description: lorem.sentence(),
  goods: random.arrayElements(),
  host: makeUserMock(),
  images: random.arrayElements(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeMapLocationMock(),
  maxAdults: datatype.number(),
  previewImage: image.city(),
  price: datatype.number(),
  rating: datatype.float(5),
});

const makeUserServerMock = (): UserServerModel => ({
  'avatar_url': image.avatar(),
  id: datatype.number(),
  'is_pro': datatype.boolean(),
  name: name.findName(),
});

const makeOfferServerMock = (): RoomOfferServerModel => ({
  id: datatype.number(),
  title: lorem.sentence(),
  type: lorem.word(),
  bedrooms: datatype.number(),
  city: {
    location: makeMapLocationMock(),
    name: CityName.Amsterdam,
  },
  description: lorem.sentence(),
  goods: random.arrayElements(),
  host: makeUserServerMock(),
  images: random.arrayElements(),
  'is_favorite': datatype.boolean(),
  'is_premium': datatype.boolean(),
  location: makeMapLocationMock(),
  'max_adults': datatype.number(),
  'preview_image': image.city(),
  price: datatype.number(),
  rating: datatype.float(5),
});

const makeCitiesMock = (): Cities => ({
  [CityName.Paris]: makeMapLocationMock(),
  [CityName.Amsterdam]: makeMapLocationMock(),
});

const makeReviewMock = (): Review => ({
  id: datatype.number(),
  comment: lorem.sentence(),
  date: date.past().toString(),
  rating: datatype.float(5),
  user: makeUserMock(),
});

const makeReviewServerMock = (): ReviewServerModel => ({
  id: datatype.number(),
  comment: lorem.sentence(),
  date: date.past().toString(),
  rating: datatype.float(5),
  user: makeUserServerMock(),
});

const makeCurrentUserMock = (): CurrentUser => ({
  avatarUrl: image.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
  token: lorem.word(),
});

const makeAuthDataMock = (): AuthData => ({
  login: internet.email(),
  password: '1234asde',
});

const makeUserStateMock = (): userState => ({
  authStatus: AuthStatus.unknown,
  userEmail: '',
});

const makeDataStateMock = (): dataState => ({
  offers: [],
  suggestedOffers: [],
  favoriteOffers: [],
  isOffersLoaded: false,
  isFavoritesLoaded: false,
  reviews: [],
  sortingType: SortingTypes.popular,
});

const makeAppStateMock = (): appState => ({
  activeCity: CityName.Paris,
  cities: {},
});

const makeMockRootState = (): RootState => ({
  USER: makeUserStateMock(),
  DATA: makeDataStateMock(),
  APP: makeAppStateMock(),
});

export {
  makeMapLocationMock,
  makeUserMock,
  makeOfferMock,
  makeOfferServerMock,
  makeCitiesMock,
  makeReviewMock,
  makeReviewServerMock,
  makeCurrentUserMock,
  makeAuthDataMock,
  makeMockRootState
};
