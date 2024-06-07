"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useGeolocation from "@/hooks/useGeolocation";
import { useCityFromCoords } from "@/hooks/useCityFromCoords";

export default function MyCityDiv() {
  const [geolocationPermission, setGeolocationPermission] =
    useState<boolean>(false);

  const { coords, loading } = useGeolocation();
  const cityName = useCityFromCoords(coords);

  useEffect(() => {
    const checkGeolocation = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation",
        });
        setGeolocationPermission(permissionStatus.state === "granted");
        permissionStatus.onchange = () =>
          setGeolocationPermission(permissionStatus.state === "granted");
      } catch (error) {
        console.error("위치 권한 확인 중 에러 발생:", error);
        setGeolocationPermission(false);
      }
    };

    checkGeolocation();
  }, []);

  return (
    <div className="flexCol items-center gap-5 p-10 text-xl">
      {geolocationPermission ? (
        !loading ? (
          cityName ? (
            <Link
              href={`${cityName}?lon=${coords?.longitude}&lat=${coords?.latitude}`}
            >
              {cityName}의 날씨는?
            </Link>
          ) : (
            <p>도시명을 불러오는 중...</p>
          )
        ) : (
          <p>위치를 불러오는 중...</p>
        )
      ) : (
        <div className="flexCenter flex-col">
          <i className="ri-map-pin-2-line ri-2x animate-bounce text-orange-400"></i>
          <p>위치액세스를 허용해주세요!</p>
        </div>
      )}
    </div>
  );
}
