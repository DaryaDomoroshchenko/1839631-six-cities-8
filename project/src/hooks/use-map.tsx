import { MutableRefObject, useState, useEffect } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/city';
import { LAYER_URL, LAYER_ATTR } from '../const';


function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng,
        },
        zoom: city.zoom,
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

  }, [mapRef, map, city]);

  return map;
}

export default useMap;
