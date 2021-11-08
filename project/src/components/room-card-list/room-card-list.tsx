import RoomCard from '../room-card/room-card';
import { RoomOffer } from '../../types/room-offer';

type RoomCardListProps = {
  offers: RoomOffer[];
  setActiveOffer: (offer: RoomOffer | null) => void;
}

function RoomCardList({ offers, setActiveOffer }: RoomCardListProps): JSX.Element {
  const handleMouseOver = (offer: RoomOffer | null): void => {
    setActiveOffer(offer);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <RoomCard
            offer={offer}
            key={offer.id}
            onMouseOver={() => handleMouseOver(offer)}
            onMouseLeave={() => handleMouseOver(null)}
          />
        ))
      }
    </div>
  );
}

export default RoomCardList;
