import { useState } from 'react';
import AddressSearch from './AddressSearch';

export default function InfoBanner({ onHide, onSetLocation }) {
  const [mode, setMode] = useState('options'); // options | address

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        onSetLocation({ lat: coords.latitude, lng: coords.longitude });
        onHide();
      },
      () => {
        // отклонено → Москва
        onSetLocation({ lat: 55.7558, lng: 37.6173 });
        onHide();
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 text-center space-y-5 shadow-xl">
        <h2 className="text-2xl font-bold">Добро пожаловать!</h2>
        <p className="text-gray-700">
          «Куда пойти?» помогает найти места рядом. Разрешите доступ к
          геопозиции или укажите адрес вручную.
        </p>

        {mode === 'options' && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
              onClick={detectLocation}
            >
              Определить автоматически
            </button>
            <button
              className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition"
              onClick={() => setMode('address')}
            >
              Ввести адрес
            </button>
          </div>
        )}

        {mode === 'address' && (
          <AddressSearch
            onLocationSet={(loc) => {
              onSetLocation(loc);
              onHide();
            }}
          />
        )}
      </div>
    </div>
  );
}
