type Coords = {
  latitude: number;
  longitude: number;
};

export const getCityName = async ({
  coords,
}: {
  coords: Coords;
}): Promise<string> => {
  try {
    const GOOGLEMAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY;
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${GOOGLEMAPS_API_KEY}`;
    const res = await fetch(geocodingUrl);
    const data = await res.json();
    const city = data.results?.[0]?.address_components?.find(
      (component: any) =>
        component.types.includes("sublocality") ||
        component.types.includes("locality") ||
        component.types.includes("political"),
    );
    return city.long_name || "알 수 없는 어떤곳...";
  } catch (error) {
    console.error("지도 정보를 가져오는 도중 오류가 발생했습니다:", error);
    return "알 수 없는 어떤곳...";
  }
};
