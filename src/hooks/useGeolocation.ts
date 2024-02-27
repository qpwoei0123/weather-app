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
    const successCallback = async (position: {
      coords: { latitude: number; longitude: number };
    }) => {
      const cityName = await getCityName({ coords: position.coords });
      setData({
        cityName,
        loaded: true,
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    };
    const errorCallback = (error: { message: any }) => {
      setData({
        loaded: true,
        errorMessege: error.message,
      });
    };

    "geolocation" in navigator
      ? navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
      : errorCallback({ message: "브라우저가 위치정보를 지원하지 않습니다." });
  }, []);

  return data;
};

export default useGeolocation;
