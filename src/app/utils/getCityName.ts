type coords = {
  latitude: number;
  longitude: number;
};
export const getCityName = async ({ coords }: { coords: coords }) => {
  const GOOGLEMAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY;
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${GOOGLEMAPS_API_KEY}`;
  const res = await fetch(geocodingUrl);
  const data = await res.json();
  console.log(data);
  const city = data.results?.[0]?.address_components?.find(
    (component: any) =>
      component.types.includes("sublocality") ||
      component.types.includes("locality") ||
      component.types.includes("political"),
  );
  return city ? city.long_name : "알수없는 어딘가...";
};
