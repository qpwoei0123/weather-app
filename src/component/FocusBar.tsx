import { useState, useEffect } from "react";

export const FocusBar = () => {
  const [geolocationPermission, setGeolocationPermission] =
    useState<boolean>(false);
  useEffect(() => {
    const checkGeolocation = async () => {
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation",
      });
      setGeolocationPermission(permissionStatus.state === "granted");
      permissionStatus.onchange = () =>
        setGeolocationPermission(permissionStatus.state === "granted");
    };

    checkGeolocation();
  }, []);

  return (
    <>
      {!geolocationPermission && (
        <div className="focus-bar fixed right-0 top-0 hidden h-2 w-full animate-pulse  bg-orange-400 lg:block" />
      )}
    </>
  );
};
