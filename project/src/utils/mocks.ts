import { address, datatype, lorem, image, name, random, date } from 'faker';
import { CityName } from '../const';
import Cities from '../types/cities';
import { Review } from '../types/review';
import { MapLocation, RoomOffer, User } from '../types/room-offer';

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

export {
  makeMapLocationMock,
  makeUserMock,
  makeOfferMock,
  makeCitiesMock,
  makeReviewMock
};
