import React from "react";
import style from "./style.module.css";

export default function Loading() {
  return (
    <div className={`${style.loadingContainer} `}>
      <div className={style.loader}></div>
    </div>
  );
}
