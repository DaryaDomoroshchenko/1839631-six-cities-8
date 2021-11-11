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

  const renderMainOffers = offers
    .map((offer) => (
      <RoomCard
        roomCardType={RoomCardType.main}
        offer={offer}
        key={offer.id}
        onMouseOver={() => handleMouseOver(offer)}
        onMouseLeave={() => handleMouseOver(null)}
      />
    ));

  const renderSuggestedOffers = offers
    .map((offer) => (
      <RoomCard
        roomCardType={RoomCardType.roomPage}
        offer={offer}
        key={offer.id}
      />
    ));

  return (
    <div
      className={getClassNames([
        'places__list',
        {'cities__places-list tabs__content': roomCardType === RoomCardType.main},
        {'near-places__list': roomCardType === RoomCardType.roomPage},
      ])}
    >
      {roomCardType === RoomCardType.main ? renderMainOffers : renderSuggestedOffers}
    </div>
  );
}

export default RoomCardList;
