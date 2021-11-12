import RoomCard from '../room-card/room-card';
import { RoomOffer } from '../../types/room-offer';
import { getClassNames } from '../../utils';
import { RoomCardType } from '../../const';

type RoomCardListProps = {
  roomCardType: RoomCardType;
  offers: RoomOffer[];
  setActiveOffer?: (offer: RoomOffer | null) => void;
}

function RoomCardList({ roomCardType, offers, setActiveOffer }: RoomCardListProps): JSX.Element {
  const handleMouseOver = (offer: RoomOffer | null): void => {
    if (setActiveOffer) {setActiveOffer(offer);}
  };

  const renderOffers = offers
    .map((offer) => (
      <RoomCard
        roomCardType={roomCardType}
        offer={offer}
        key={offer.id}
        onMouseOver={roomCardType === RoomCardType.mainPage ? () => handleMouseOver(offer) : undefined}
        onMouseLeave={roomCardType === RoomCardType.mainPage ? () => handleMouseOver(null) : undefined}
      />
    ));

  return (
    <div
      className={getClassNames([
        'places__list',
        {'cities__places-list tabs__content': roomCardType === RoomCardType.mainPage},
        {'near-places__list': roomCardType === RoomCardType.roomPage},
      ])}
    >
      {renderOffers}
    </div>
  );
}

export default RoomCardList;
