"use client";
import { useState, useEffect } from "react";

type GeolocationData = {
  loading: boolean;
  coords?: { latitude: number; longitude: number };
  errorMessage?: string;
};

const useGeolocation = (): GeolocationData => {
  const [data, setData] = useState<GeolocationData>({
    loading: true,
  });

  useEffect(() => {
    const successCallback = ({ coords }: GeolocationPosition) => {
      setData({
        loading: false,
        coords: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      });
    };
    const errorCallback = ({ message }: GeolocationPositionError) => {
      setData({
        loading: false,
        errorMessage: message,
      });
    };

    // 권한 체크 이후 실행이 보장되어야 하므로, permissionStatus를 사용하여 체크
    const checkPermissionAndFetchLocation = async () => {
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation",
      });

      permissionStatus.onchange = () => {
        if (permissionStatus.state === "granted") {
          navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback,
          );
        }
      };
    };
    checkPermissionAndFetchLocation();
    // 초기 권한요청을 위해 빈 함수를 실행
    navigator.geolocation.getCurrentPosition(() => {});
  }, []);

  return data;
};

export default useGeolocation;
