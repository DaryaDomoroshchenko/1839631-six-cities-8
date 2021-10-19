import { useState  } from 'react';
import RoomCard from '../room-card/room-card';
import { RoomOffer } from '../../types/room-offer';

type RoomCardListProps = {
  roomOffers: RoomOffer[];
}

function RoomCardList({ roomOffers }: RoomCardListProps): JSX.Element {
  const [, setActiveCardId] = useState<number | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        roomOffers.map((roomOffer) => (
          <RoomCard
            roomOffer={roomOffer}
            key={roomOffer.id}
            onMouseOver={() => setActiveCardId(roomOffer.id)}
            onMouseLeave={() => setActiveCardId(null)}
          />
        ))
      }
    </div>
  );
}

export default RoomCardList;
