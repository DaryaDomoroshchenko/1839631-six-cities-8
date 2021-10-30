export type offerLocation = {
  latitude: number,
  longitude: number,
  zoom: number,
}

export type RoomOffer = {
  id: number,
  title: string,
  type: string,
  bedrooms: number,
  city: {
    name: string,
    location: offerLocation,
  },
  description: string,
  goods: string[],
  host: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string,
  },
  imageUrls: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: offerLocation,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
};
