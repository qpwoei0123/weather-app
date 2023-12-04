const API_KEY = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY;

export interface CityInfo {
  cityName: string | null;
  longitude: number;
  latitude: number;
}

export const getCityInfo = (): Promise<CityInfo | null> => {
  return new Promise((resolve, reject) => {
    // 위치 정보를 가져오기 위한 비동기 함수
    const getGeolocation = (): void => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 위치 정보를 기반으로 지오코딩 API에 대한 요청
          const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${API_KEY}`;
          fetch(geocodingUrl)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              // API 응답에서 도시 정보 추출
              const city = data.results?.[0]?.address_components?.find(
                (component: any) => component.types.includes("sublocality")
              );
              // CityInfo 타입을 따르는 객체 생성
              const cityInfo: CityInfo = {
                cityName: city ? city.long_name : null,
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
              };
              resolve(cityInfo);
            })
            .catch(reject); // fetch 오류 처리
        },
        reject // 위치 정보 검색 실패시 처리
      );
    };

    // 브라우저가 위치 정보를 지원하는지 확인
    if ("geolocation" in navigator) {
      getGeolocation(); // 위치 정보 가져오기 시작
    } else {
      reject(new Error("Geolocation이 지원되지 않습니다."));
    }
  });
};
