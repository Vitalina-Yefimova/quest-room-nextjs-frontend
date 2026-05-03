'use client';

import { APIProvider, Map, Marker, useMapsLibrary } from '@vis.gl/react-google-maps';
import { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } from '@/utils/config';

function MapWithMarker() {
  const maps = useMapsLibrary('maps');
  const center = {
    lat: 51.045190861031465,
    lng: -114.05957001271959,
  };

  return (
    <Map
      defaultCenter={center}
      defaultZoom={14}
      className="w-full h-full rounded-lg"
      mapId="quests-calgary-map"
    >
      <Marker
        position={center}
        icon={
          maps && typeof google !== 'undefined'
            ? {
                url: '/location-map-icon.svg',
                scaledSize: new google.maps.Size(47.5, 61),
              }
            : undefined
        }
      />
    </Map>
  );
}

export default function GoogleMap() {
  const apiKey = NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-[649px] h-[336px] mt-[47px] flex items-center justify-center bg-gray-200 rounded-lg">
        <p className="text-gray-600">Google Maps API key not configured</p>
      </div>
    );
  }

  return (
    <div className="w-[649px] h-[336px] mt-[47px]">
      <APIProvider apiKey={apiKey}>
        <MapWithMarker />
      </APIProvider>
    </div>
  );
}
