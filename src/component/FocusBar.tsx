import { useState, useEffect } from "react";

export const FocusBar = () => {
  const [isGeolocation, setGeolocation] = useState<boolean>(false);
  useEffect(() => {
    // 위치엑세스 권한 체크
    const checkgeolocation = async () => {
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation",
      });
      if (permissionStatus.state === "granted") {
        setGeolocation(true);
      } else {
        setGeolocation(false);
      }
    };

    checkgeolocation();
  }, []);

  return (
    <>
      {!isGeolocation && (
        <div className="focus-bar fixed right-32 top-0 hidden h-2 w-56 animate-pulse rounded-b-full bg-green-500 lg:block" />
      )}
    </>
  );
};
