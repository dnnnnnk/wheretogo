import { GoogleMap, Marker } from '@react-google-maps/api';
import { useCallback, useState } from 'react';

const containerStyle = { width: '100%', height: '300px' };

export default function MapView({ center, places, onMapLoad }) {
  const [map, setMap] = useState(null);

  const handleLoad = useCallback((m) => {
    setMap(m);
    onMapLoad(m);
  }, [onMapLoad]);

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={handleLoad}
      >
        {places.map((p) => (
          <Marker
            key={p.place_id}
            position={{
              lat: p.geometry.location.lat(),
              lng: p.geometry.location.lng(),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
