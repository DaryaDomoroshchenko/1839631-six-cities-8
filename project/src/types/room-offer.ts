import { CityName } from '../const';

export type MapLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type User = {
  avatarUrl: string;
  'avatar_url'?: string,
  id: number;
  isPro: boolean;
  'is_pro'?: boolean,
  name: string;
}

export type RoomOffer = {
  id: number;
  title: string;
  type: string;
  bedrooms: number;
  city: {
    location: MapLocation;
    name: CityName;
  };
  description: string;
  goods: string[];
  host: User;
  images: string[];
  isFavorite: boolean;
  'is_favorite'?: boolean,
  isPremium: boolean;
  'is_premium'?: boolean,
  location: MapLocation;
  maxAdults: number;
  'max_adults'?: number,
  previewImage: string;
  'preview_image'?: string,
  price: number;
  rating: number;
};

export type UserServerModel = {
  'avatar_url': string,
  id: number;
  'is_pro': boolean,
  name: string;
}

export type RoomOfferServerModel = {
  bedrooms: number,
  city: {
    location: MapLocation;
    name: string;
  };
  description: string,
  goods: string[],
  host: {
    'avatar_url': string,
    id: number,
    'is_pro': boolean,
    name: string,
  }
  id: number,
  images: string[],
  'is_favorite': boolean,
  'is_premium': boolean,
  location: MapLocation,
  'max_adults': number,
  'preview_image': string,
  price: number,
  rating: number,
  title: string,
  type: string,
};

export type changeFavStatusParams = {
  offerId: number;
  status: number;
}
