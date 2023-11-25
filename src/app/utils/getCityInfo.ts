const API_KEY = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY;

export const getCityInfo = (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    // 위치 정보를 가져오는 비동기 함수
    const getGeolocation = (): void => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 위치 정보를 기반으로 지오코딩 API에 요청
          const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${API_KEY}`;
          fetch(geocodingUrl)
            .then((response) => response.json())
            .then((data) => {
              // API 응답에서 도시 정보 추출
              const city = data.results?.[0]?.address_components?.find(
                (component: any) => component.types.includes("locality")
              );
              // cityName 생성
              const cityName = city ? city.long_name : null;
              resolve(cityName);
            })
            .catch(reject); // fetch 에러 처리
        },
        reject // 위치 정보 가져오기 실패 시 처리
      );
    };

    // 브라우저가 위치 정보 지원 여부 확인
    if ("geolocation" in navigator) {
      getGeolocation(); // 위치 정보 가져오기 시작
    } else {
      reject(new Error("Geolocation is not supported."));
    }
  });
};
