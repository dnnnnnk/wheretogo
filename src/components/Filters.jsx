import { useState } from 'react';
const categories = [
  { id: 'cafe', label: '☕ Кафе' },
  { id: 'park', label: '🌳 Парк' },
  { id: 'movie_theater', label: '🎬 Кино' },
  { id: 'gym', label: '🏋️ Спортзал' },
];

const sortOptions = [
  { id: 'rating', label: '⭐ По отзывам' },
  { id: 'distance', label: '📍 По удаленности' },
];

export default function Filters({ category, setCategory, sortBy, setSortBy }) {
  const [tab, setTab] = useState('filters');

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            tab === 'filters' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => setTab('filters')}
        >
          Фильтры
        </button>
        <button
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            tab === 'sort' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => setTab('sort')}
        >
          Сортировка
        </button>
      </div>

      {tab === 'filters' && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                category === c.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {tab === 'sort' && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {sortOptions.map((s) => (
            <button
              key={s.id}
              onClick={() => setSortBy(s.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                sortBy === s.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
