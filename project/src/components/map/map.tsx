import { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Marker, Icon, LayerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { MapIconUrl, MapIconSize } from '../../const';
import { MapLocation } from '../../types/room-offer';

type MapProps = {
  points: {
    id: number;
    latitude: number;
    longitude: number;
  }[];
  activePointId: number | null;
  mapCenterPoint: MapLocation | null;
}

const defaultIcon = new Icon({
  iconUrl: MapIconUrl.default,
  iconSize: [MapIconSize.width, MapIconSize.height],
  iconAnchor: [MapIconSize.width / 2, MapIconSize.height],
});

const activeIcon = new Icon({
  iconUrl: MapIconUrl.active,
  iconSize: [MapIconSize.width, MapIconSize.height],
  iconAnchor: [MapIconSize.width / 2, MapIconSize.height],
});

function Map({ points, activePointId, mapCenterPoint }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, mapCenterPoint);

  const markerGroup = useRef(new LayerGroup());

  useEffect(() => {
    if (map) {
      markerGroup.current.clearLayers();

      points.forEach((point) => {
        const isActivePoint = point.id === activePointId;
        const { latitude: lat, longitude: lng } = point;

        const marker = new Marker({ lat, lng });

        marker
          .setIcon(isActivePoint ? activeIcon : defaultIcon)
          .addTo(markerGroup.current);
      });
      markerGroup.current.addTo(map);
    }
  }, [map, points, activePointId]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
