import { MutableRefObject, useState, useEffect, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { LAYER_URL, LAYER_ATTR } from '../const';
import { MapLocation } from '../types/room-offer';

function useMap(
  mapRef: MutableRefObject<HTMLDivElement | null>,
  mapCenterPoint: MapLocation | undefined,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const initialCenter = useRef(mapCenterPoint);

  useEffect(() => {
    if (initialCenter.current) {
      const { latitude: lat, longitude: lng, zoom } = initialCenter.current;

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

  }, [mapRef, map]);

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
