"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import location from "../asset/Location.png";
import Image from "next/image";
import useGeolocation from "@/hooks/useGeolocation";

export default function MyCityDiv() {
  const [isGeolocation, setGeolocation] = useState<boolean>(false);
  const { coords, errorMessege, loaded, cityName } = useGeolocation();

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

  // 위치엑세스 권한 유무, 도시정보 유무
  return (
    <div className="flexCol items-center gap-5 p-10 text-xl">
      {isGeolocation ? (
        loaded ? (
          <>
            {coords && cityName && (
              <Link
                href={`${cityName}?lon=${coords.longitude}&lat=${coords.latitude}`}
              >
                {cityName}의 날씨는?
              </Link>
            )}
            {errorMessege && <p className="text-red-500">{errorMessege}</p>}
          </>
        ) : (
          <p>위치를 불러오는 중...</p>
        )
      ) : (
        <div className="flexCenter flex-col">
          <Image src={location} alt="location img" className="animate-bounce" />
          <p>
            위치액세스 허용 후 <br /> 새로고침 해주세요!
          </p>
        </div>
      )}
    </div>
  );
}
