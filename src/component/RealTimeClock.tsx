"use client";
import React, { useState, useEffect } from "react";
import style from "./style.module.css";

export const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1000ms(1초)마다 갱신

    // 컴포넌트가 언마운트될 때 interval 해제
    return () => clearInterval(intervalId);
  }, []); // 최초 렌더링 시에만 실행

  const formattedTime = currentTime.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 오전/오후를 표시하지 않음
  });

  return <div className={style.clockBox}>{formattedTime}</div>;
};
