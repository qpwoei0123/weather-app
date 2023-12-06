import { StaticImageData } from "next/image";
import clear from "../../asset/clear.jpg";
import cloudy from "../../asset/cloudy.png";
import rain from "../../asset/rain.png";
import snow from "../../asset/snow.png";

// 날씨code를 받아서 StaticImageData을 반환하는 함수.
export const getWeatherImg = async (code: number): Promise<StaticImageData> => {
  // 응답 데이터 표를 보며 골라낸? 코드분류
  const weatherCodes = {
    clear: [1000, 1003],
    cloudy: [1006, 1009, 1030, 1072, 1135, 1147],
    rain: [
      1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198,
      1201, 1240, 1243, 1246, 1273, 1276,
    ],
  };
  const isClear = weatherCodes.clear.includes(code);
  const isCloudy = weatherCodes.cloudy.includes(code);
  const isRainy = weatherCodes.rain.includes(code);

  if (isClear) {
    return clear;
  } else if (isCloudy) {
    return cloudy;
  } else if (isRainy) {
    return rain;
  } else {
    return snow;
  }
};
