export type MapLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type RoomOffer = {
  id: number;
  title: string;
  type: string;
  bedrooms: number;
  city: {
    location: MapLocation;
    name: string;
  };
  description: string;
  goods: string[];
  host: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
  imageUrls: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: MapLocation;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
};
