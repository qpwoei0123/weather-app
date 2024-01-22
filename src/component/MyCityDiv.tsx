"use client";
import React, { useEffect, useState } from "react";
import { CityInfo, getCityInfo } from "@/app/utils/getCityInfo";
import Link from "next/link";
import location from "../asset/Location.png";
import Image from "next/image";

export default function MyCityDiv() {
  const [cityInfo, setCityInfo] = useState<CityInfo | null>(null);
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

    // 현재 위치한 도시 데이터 가져오기
    const fetchData = async () => {
      try {
        const data = await getCityInfo();
        setCityInfo(data ? data : null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    checkgeolocation();
  }, []);

  // 위치엑세스 권한 유무, 도시정보 유무
  return (
    <div className="flexCol items-center gap-5 p-10">
      {!isGeolocation && (
        <Image src={location} alt="location img" className="animate-bounce" />
      )}
      <div className="text-xl">
        {isGeolocation ? (
          cityInfo ? (
            <Link
              href={`${cityInfo.cityName}?lon=${cityInfo.longitude}&lat=${cityInfo.latitude}`}
            >
              {cityInfo.cityName}의 날씨는?
            </Link>
          ) : (
            <p>위치를 불러오는 중...</p>
          )
        ) : (
          <p>
            위치액세스 허용 후 <br />
            새로고침 해주세요!
          </p>
        )}
      </div>
    </div>
  );
}
