import { MutableRefObject, useState, useEffect } from 'react';
import { Map, TileLayer } from 'leaflet';
import { LAYER_URL, LAYER_ATTR } from '../const';
import { MapLocation } from '../types/room-offer';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  cityLocation: MapLocation | undefined,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (cityLocation) {
      const { latitude: lat, longitude: lng, zoom } = cityLocation;

      if (mapRef.current !== null && map === null) {
        const instance = new Map(mapRef.current, {
          center: { lat, lng },
          zoom,
        });

        const layer = new TileLayer(
          LAYER_URL,
          {
            attribution: LAYER_ATTR,
          },
        );

        instance.addLayer(layer);
        setMap(instance);
      }

      if (map) {
        map.setView({ lat, lng }, zoom);
      }
    }

  }, [mapRef, map, cityLocation]);

  return map;
}

export default useMap;
