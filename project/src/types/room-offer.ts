export type RoomOffer = {
  id: number,
  title: string,
  type: string,
  bedrooms: number,
  city: {
    name: string,
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
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
};
