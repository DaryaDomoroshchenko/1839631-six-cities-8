import RoomCard from '../room-card/room-card';
import { RoomOffer } from '../../types/room-offer';
import { getClassNames } from '../../utils';

type RoomCardListProps = {
  roomCardType: string;
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
        onMouseOver={roomCardType === 'mainPage' ? () => handleMouseOver(offer) : undefined}
        onMouseLeave={roomCardType === 'mainPage' ? () => handleMouseOver(null) : undefined}
      />
    ));

  return (
    <div
      className={getClassNames([
        'places__list',
        {'cities__places-list tabs__content': roomCardType === 'mainPage'},
        {'near-places__list': roomCardType === 'roomPage'},
      ])}
    >
      {renderOffers}
    </div>
  );
}

export default RoomCardList;
