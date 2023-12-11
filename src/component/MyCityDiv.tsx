"use client";
import React, { useEffect, useState } from "react";
import { CityInfo, getCityInfo } from "@/app/utils/getCityInfo";
import style from "./style.module.css";
import Link from "next/link";

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
    <>
      {isGeolocation ? (
        cityInfo ? (
          <Link
            href={`${cityInfo.cityName}?lon=${cityInfo.longitude}&lat=${cityInfo.latitude}`}
            className={style.link}
          >
            {cityInfo.cityName}의 날씨는?
          </Link>
        ) : (
          <p>위치를 불러오는 중...</p>
        )
      ) : (
        <p>위치 액세스를 허용 해주세요!</p>
      )}
    </>
  );
}
