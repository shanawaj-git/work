export const getAddress = (mapOutput): Object => {
  const {
    form: { direction, flatvillaname, flatvillano },
    addressFetched: {
      formatted_address,
      geometry: {
        location: { lat, lng },
      },
    },
  } = mapOutput;
  return {
    flatVillaNumber: flatvillano,
    formattedText: formatted_address,
    buildingName: flatvillaname,
    userNotes: direction,
    latitude: lat,
    longitude: lng,
  };
};
