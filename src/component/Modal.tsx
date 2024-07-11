"use client";
import { useState } from "react";
import MyCityDiv from "./MyCityDiv";
import "./style.module.css";
import { FocusBar } from "./FocusBar";
import { TypingEffect } from "../component/TypingEffect";

export const Modal = () => {
  const [scriptStep, setScriptStep] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const onClick = () => {
    if (isTypingComplete) {
      scriptStep < 2 && setScriptStep((prev) => prev + 1);
      setIsTypingComplete(false);
    }
  };

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };

  return (
    <>
      <section
        className="flexCenter fixed left-0 top-0 z-50 size-full animate-showBlur text-orange-400"
        onClick={onClick}
      >
        {scriptStep === 0 ? (
          <>
            <TypingEffect
              text="SnapWeather"
              onComplete={handleTypingComplete}
            />
            <span className="ml-1 h-4 w-[0.15rem] animate-pulse bg-orange-400"></span>
          </>
        ) : scriptStep === 1 ? (
          <>
            <TypingEffect
              text="동네 날씨를 알려드릴게요!"
              onComplete={handleTypingComplete}
            />
            <span className="ml-1 h-4 w-[0.15rem] animate-pulse bg-orange-400"></span>
          </>
        ) : (
          <>
            <FocusBar />
            <div className="flexCenter size-full flex-col gap-5">
              <MyCityDiv />
            </div>
          </>
        )}
      </section>
    </>
  );
};
