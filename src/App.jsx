import { useState, useEffect, useCallback } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import MapView from './components/MapView';
import Filters from './components/Filters';
import PlaceCard from './components/PlaceCard';
import InfoBanner from './components/InfoBanner';
import AddressSearch from './components/AddressSearch';
import { fetchNearbyPlaces } from './hooks/usePlaces.js';

const libraries = ['places'];

export default function App() {
  const [userPos, setUserPos] = useState(null);
  const [category, setCategory] = useState('cafe');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [showBanner, setShowBanner] = useState(true);
  const [sortBy, setSortBy] = useState('rating');

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const loadPlaces = useCallback(async () => {
    if (!mapInstance || !userPos) return;
    setLoading(true);
    try {
      const res = await fetchNearbyPlaces({
        map: mapInstance,
        location: new window.google.maps.LatLng(userPos.lat, userPos.lng),
        category,
      });
      let sorted = res;
      if (sortBy === 'rating') {
        sorted = [...res].sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'distance') {
        sorted = [...res].sort((a, b) => a.distance - b.distance);
      }
      setPlaces(sorted);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [mapInstance, userPos, category, sortBy]);

  useEffect(() => {
    loadPlaces();
  }, [loadPlaces]);

  const decideForMe = () => {
    if (!places.length) return;
    const p = places[Math.floor(Math.random() * places.length)];
    window.open(`https://www.google.com/maps/place/?q=place_id:${p.place_id}`, '_blank');
  };

  if (loadError) return <p className="text-center mt-12">Ошибка загрузки карт</p>;
  if (!isLoaded) return <p className="text-center mt-12">Загрузка…</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      {showBanner && (
        <InfoBanner
          onHide={() => setShowBanner(false)}
          onSetLocation={setUserPos}
        />
      )}

      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <h1 className="text-3xl font-bold whitespace-nowrap">Куда пойти?</h1>
          {/* inline address search (compact) */}
          {!showBanner && (
            <div className="flex-1 sm:flex-none">
              <AddressSearch compact onLocationSet={setUserPos} />
            </div>
          )}
        </div>
        <button
          onClick={decideForMe}
          className="bg-accent text-white px-5 py-2 rounded-full hover:bg-accent/90 transition"
        >
          Реши за меня
        </button>
      </header>

      {userPos && (
        <>
          <div className="rounded-xl shadow mb-4">
            <MapView center={userPos} places={places} onMapLoad={setMapInstance} />
          </div>

          <section className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold px-1">
              Найдено {places.length} мест
            </h2>
            <Filters category={category} setCategory={setCategory} sortBy={sortBy} setSortBy={setSortBy} />

            {!loading && places.filter(p => p.photos && p.user_ratings_total > 0).length === 0 && (
              <p className="text-center text-gray-500 mt-10">Ничего не найдено. Попробуйте изменить фильтры.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(loading ? Array(4).fill({}) : places.filter(p => p.photos && p.user_ratings_total > 0)).map((p, i) => (
                <PlaceCard key={p.place_id || i} place={p} loading={loading} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
