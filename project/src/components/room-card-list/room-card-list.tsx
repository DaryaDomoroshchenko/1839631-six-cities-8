import RoomCard from '../room-card/room-card';
import { RoomOffer } from '../../types/room-offer';

type RoomCardListProps = {
  roomOffers: RoomOffer[];
  setActiveOffer: (offer: RoomOffer | null) => void;
}

function RoomCardList({ roomOffers, setActiveOffer }: RoomCardListProps): JSX.Element {
  const handleMouseOver = (offer: RoomOffer | null): void => {
    setActiveOffer(offer);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        roomOffers.map((roomOffer) => (
          <RoomCard
            roomOffer={roomOffer}
            key={roomOffer.id}
            onMouseOver={() => handleMouseOver(roomOffer)}
            onMouseLeave={() => handleMouseOver(null)}
          />
        ))
      }
    </div>
  );
}

export default RoomCardList;
