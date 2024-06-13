"use client";
import { useState } from "react";
import { getCityName } from "@/app/utils/getCityName";

type coords = {
  latitude: number;
  longitude: number;
};

export const useCityFromCoords = (coords: coords | null) => {
  const [city, setCity] = useState<string | null>(null);
  if (coords) {
    getCityName({ coords: coords })
      .then((city) => setCity(city))
      .catch((error) =>
        console.error("도시명을 가져오는 동안 에러 발생:", error),
      );
  }
  return city;
};
