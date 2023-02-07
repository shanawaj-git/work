export const initialCoordinates =
  process.env.NEXT_PUBLIC_INITIAL_COORDINATES &&
  Object.values(JSON.parse(process.env.NEXT_PUBLIC_INITIAL_COORDINATES));

export const ZOOM_LEVELS = {
  levelToHideAll: 8,
  levelToDisplayAll: 10,
};

export const mapProps = {
  initialCoordinates,
  woosMapKey: process.env.NEXT_PUBLIC_WOOSMAP_KEY,
  googlePlacesKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY,
  googleMapKey: process.env.NEXT_PUBLIC_GOOGLE_KEY,
};
