import { User } from './room-offer';

export type Review = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: User,
}

export type ReviewServerModel = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: {
    'avatar_url': string,
    id: number;
    'is_pro': boolean,
    name: string;
  }
}

export type sentReview = {
  id: number,
  comment: string,
  rating: number,
}
