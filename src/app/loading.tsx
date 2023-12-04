import React from "react";
import style from "./style.module.css";

export default function Loading() {
  return (
    <div className={style.loadingContainer}>
      <div className={style.cloud}>기상정보를 가져오는중...</div>
    </div>
  );
}
