interface CityInfo {
  city: string | null;
  latitude: number | null;
  longitude: number | null;
}

export const getCityInfo = (): Promise<CityInfo> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyC5xw7dXiKB1bNvV3_oVJRNaB3Lcdxa8mI`;
        fetch(geocodingUrl)
          .then((response) => response.json())
          .then((data) => {
            // Check if results array is not empty
            if (data.results && data.results.length > 0) {
              const city = data.results[0].address_components?.find(
                (component: any) => component.types.includes("locality")
              );
              const cityInfo: CityInfo = {
                city: city ? city.long_name : null,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              resolve(cityInfo);
            } else {
              reject(new Error("No results in the API response."));
            }
          })
          .catch((error) => {
            reject(error);
          });
      },
      (error) => {
        reject(error);
      }
    );
  });
};
