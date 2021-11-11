import { useRef, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import { Marker, Icon, LayerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { MapIconUrl, MapIconSize } from '../../const';
import State from '../../types/state';

type MapProps = {
  points: {
    id: number;
    latitude: number;
    longitude: number;
  }[];
  activePointId: number | null;
}

const mapStateToProps = ({ cities, activeCity }: State) => ({
  cities, activeCity,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedMapProps = PropsFromRedux & MapProps;

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

function Map({ points, activePointId, cities, activeCity }: ConnectedMapProps): JSX.Element {
  const cityLocation = cities[activeCity];

  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation);

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

export { Map };
export default connector ( Map );
