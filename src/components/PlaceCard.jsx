export default function PlaceCard({ place, loading }) {
  if (loading) {
    return (
      <div className="animate-pulse bg-white rounded-2xl shadow-lg p-4 space-y-2">
        <div className="h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 11l3 3L16 8" />
          </svg>
        </div>
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-6 bg-gray-200 rounded w-1/3" />
      </div>
    );
  }

  const { name, rating, user_ratings_total, place_id, photos } = place;
  const photoUrl = photos ? photos[0].getUrl({ maxWidth: 400 }) : null;
  const mapUrl = `https://www.google.com/maps/place/?q=place_id:${place_id}`;

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.01] hover:shadow-xl active:scale-[0.99] cursor-pointer hover:brightness-95 animate-fadeIn">
      {photoUrl && (
        <div className="relative">
          <img src={photoUrl} alt={name} className="h-32 w-full object-cover rounded-t-2xl" />
          <div className="absolute top-2 right-2 bg-white/90 text-gray-800 text-sm px-2 py-0.5 rounded-full shadow">
            ⭐ {rating?.toFixed(1) ?? '–'}
          </div>
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2 min-h-[3rem]">
          {name}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-3 gap-2 bg-gray-100 rounded px-2 py-1 w-fit">
          <svg
            className="w-4 h-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.965c.3.921-.755 1.688-1.54 1.118l-3.376-2.455a1 1 0 00-1.176 0l-3.376 2.455c-.784.57-1.838-.197-1.54-1.118l1.286-3.965a1 1 0 00-.364-1.118L2.05 9.392c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.951-.69l1.285-3.965z"></path>
          </svg>
          <span>{rating?.toFixed(1) ?? '–'}</span>
          <span className="ml-1">({user_ratings_total ?? 0})</span>
        </div>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-block text-center bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
        >
          <span className="inline-flex items-center gap-1 justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132a.5.5 0 00-.79.407v5.114a.5.5 0 00.79.407l3.197-2.132a.5.5 0 000-.815z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Открыть в Картах
          </span>
        </a>
      </div>
    </article>
  );
}
