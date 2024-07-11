import Link from "next/link";
import useGeolocation from "@/hooks/useGeolocation";
import { useCityFromCoords } from "@/hooks/useCityFromCoords";
import { TypingEffect } from "./TypingEffect";

export default function MyCityDiv() {
  const { coords, isLoading, isGranted, errorMessage } = useGeolocation();
  const cityName = useCityFromCoords(coords);

  return (
    <>
      {isGranted ? (
        !isLoading ? (
          cityName ? (
            <Link
              href={`${cityName}?lon=${coords?.longitude}&lat=${coords?.latitude}`}
              className="text-2xl text-orange-400 hover:text-orange-600"
            >
              <TypingEffect
                text={`${cityName}의 날씨는?`}
                onComplete={() => {}}
              />
            </Link>
          ) : (
            <div className="flexCenter flex-col gap-3">
              <i className="ri-loader-line ri-2x animate-spin text-orange-400" />
              <TypingEffect
                text={`도시명을 불러오는 중이에요...`}
                onComplete={() => {}}
              />
            </div>
          )
        ) : (
          <div className="flexCenter flex-col gap-3">
            <TypingEffect
              text={`위치를 불러오는 중...`}
              onComplete={() => {}}
            />
          </div>
        )
      ) : (
        <div className="flexCenter flex-col gap-3">
          <i className="ri-map-pin-2-line ri-2x animate-pulse text-orange-400"></i>
          <TypingEffect
            text={`위치액세스를 허용해 주세요!`}
            onComplete={() => {}}
          />
        </div>
      )}
    </>
  );
}
