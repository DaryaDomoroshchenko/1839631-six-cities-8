import { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Marker, Icon } from 'leaflet';
import useMap from '../../hooks/use-map';
import { City } from '../../types/city';
import { RoomOffer } from '../../types/room-offer';
import { MapIconUrl, MapIconSize } from '../../const';

type pointsLocation = {
  id: number;
  latitude: number;
  longitude: number;
}

type MapProps = {
  city: City;
  points: pointsLocation[];
  activeOffer: RoomOffer | null;
}

const defaultIcon = new Icon({
  iconUrl: MapIconUrl.Default,
  iconSize: [MapIconSize.Width, MapIconSize.Height],
  iconAnchor: [MapIconSize.Width / 2, MapIconSize.Height],
});

const activeIcon = new Icon({
  iconUrl: MapIconUrl.Active,
  iconSize: [MapIconSize.Width, MapIconSize.Height],
  iconAnchor: [MapIconSize.Width / 2, MapIconSize.Height],
});

function Map({ city, points, activeOffer }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            activeOffer && point.id === activeOffer.id
              ? activeIcon
              : defaultIcon,
          )
          .addTo(map);
      });
    }
  }, [map, points, activeOffer]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
