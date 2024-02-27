"use client";
import { useState, useEffect } from "react";
import { getCityName } from "@/app/utils/getCityName";

type GeolocationData = {
  loaded: boolean;
  cityName?: string;
  coords?: { latitude: number; longitude: number };
  errorMessege?: string;
};

const useGeolocation = (): GeolocationData => {
  const [data, setData] = useState<GeolocationData>({
    loaded: false,
  });

  useEffect(() => {
    const successCallback = async ({ coords }: GeolocationPosition) => {
      const cityName = await getCityName({ coords: coords });
      setData({
        cityName,
        loaded: true,
        coords: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      });
    };
    const errorCallback = ({ message }: GeolocationPositionError) => {
      setData({
        loaded: true,
        errorMessege: message,
      });
    };
    // 브라우저가 geolocation을 지원하지 않는 경우를 체크
    "geolocation" in navigator
      ? navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
      : setData({
          loaded: true,
          errorMessege: "브라우저가 geolocation을 지원하지 않습니다.",
        });
  }, []);

  return data;
};

export default useGeolocation;
