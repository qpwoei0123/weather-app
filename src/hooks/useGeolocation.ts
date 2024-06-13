import { useState, useEffect } from "react";

type GeolocationData = {
  isLoading: boolean;
  isGranted: boolean;
  coords: { latitude: number; longitude: number } | null;
  errorMessage: string | null;
};

const useGeolocation = (): GeolocationData => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGranted, setIsGranted] = useState<boolean>(false);
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const successCallback = ({ coords }: GeolocationPosition) => {
      setCoords({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setIsGranted(true);
    };

    const errorCallback = ({ message }: GeolocationPositionError) => {
      setErrorMessage(message);
      setIsGranted(false);
    };

    const fetchCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    };

    const checkPermissionAndFetchLocation = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation",
        });

        fetchCurrentPosition();
        setIsGranted(permissionStatus.state === "granted");

        permissionStatus.onchange = () => {
          permissionStatus.state === "granted" && fetchCurrentPosition();
          setIsGranted(permissionStatus.state === "granted");
        };
      } catch (error) {
        console.error("위치 권한 쿼리 조회 중 에러 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkPermissionAndFetchLocation();
  }, []);

  return { isLoading, isGranted, coords, errorMessage };
};

export default useGeolocation;
