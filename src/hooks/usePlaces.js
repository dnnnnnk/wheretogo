export const fetchNearbyPlaces = ({ map, location, category }) =>
  new Promise((resolve, reject) => {
    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(
      { location, radius: 1500, type: category },
      (results, status) =>
        status === window.google.maps.places.PlacesServiceStatus.OK
          ? (() => {
              const processed = results
                .map(place => ({
                  ...place,
                  photoUrl: place.photos?.[0]?.getUrl?.() || null,
                }))
                .filter(place => place.photoUrl);
              resolve(processed);
            })()
          : reject(status)
    );
  });
