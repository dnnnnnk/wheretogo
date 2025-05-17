import { useState } from 'react';

export default function AddressSearch({ onLocationSet, compact = false }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query.trim()) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: query }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        onLocationSet({ lat: lat(), lng: lng() });
      } else {
        alert('Не удалось найти адрес');
      }
    });
  };

  return (
    <div className={`flex ${compact ? 'gap-1' : 'gap-2'} w-full`}>
      <input
        className={`flex-1 px-3 py-2 border rounded-lg ${compact ? 'text-sm' : ''}`}
        placeholder="Введите адрес..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button
        className={`bg-primary text-white rounded-lg ${compact ? 'px-3' : 'px-4'} ${compact ? 'text-sm' : ''}`}
        onClick={handleSearch}
      >
        Показать
      </button>
    </div>
  );
}
