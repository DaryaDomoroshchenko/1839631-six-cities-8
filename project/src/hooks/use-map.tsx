import { MutableRefObject, useState, useEffect } from 'react';
import { Map, TileLayer } from 'leaflet';
import { LAYER_URL, LAYER_ATTR } from '../const';
import { MapLocation } from '../types/room-offer';

function useMap(
  mapRef: MutableRefObject<HTMLDivElement | null>,
  mapCenterPoint: MapLocation | null,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapCenterPoint) {
      const { latitude: lat, longitude: lng, zoom } = mapCenterPoint;

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
    }

  }, [mapRef, map, mapCenterPoint]);

  useEffect(() => {
    if (mapCenterPoint) {
      const { latitude: lat, longitude: lng, zoom } = mapCenterPoint;

      if (map) {
        map.flyTo({ lat, lng }, zoom);
      }
    }

  }, [map, mapCenterPoint]);

  return map;
}

export default useMap;
