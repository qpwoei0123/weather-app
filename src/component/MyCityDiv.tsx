"use client";
import React, { useEffect, useState } from "react";
import { getCityInfo } from "@/app/utils/getCityInfo";
import style from "./style.module.css";

export default function MyCityDiv() {
  const [cityInfo, setCityInfo] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCityInfo();
        setCityInfo(data?.cityName ?? null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행됨

  // cityInfo가 아직 없는 경우를 처리
  return (
    <p className={style.myCity}>
      {cityInfo ? `${cityInfo}의 날씨 알아보기.` : "Loading..."}
    </p>
  );
}
