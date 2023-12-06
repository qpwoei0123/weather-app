import HomeButton from "@/component/HomeButton";
import { getForecast } from "../utils/getForecast";
import style from "../style.module.css";
import Image from "next/image";
import { getTime } from "../utils/getTime";
import { getWeatherImg } from "../utils/getWeatherImg";

type Props = {
  params: {
    location: string;
  };
  searchParams: {
    lon: number;
    lat: number;
  };
};

// 메타 데이터 자동생성
export function generateMetadata({ params }: Props) {
  const location = decodeURIComponent(params.location);
  return {
    title: `날씨앱 - ${location}`,
    discription: `${location} 의날씨를 알려드림`,
  };
}

export default async function Location({ params, searchParams }: Props) {
  const name = decodeURIComponent(params.location);
  const forecast = await getForecast(searchParams.lat, searchParams.lon);
  const time = await getTime(forecast.location.tz_id);
  const weatherSrc = await getWeatherImg(forecast.current.condition.code);

  return (
    <>
      <Image
        src={weatherSrc}
        alt="backgroundImg"
        className={style.backgroundImg}
      />
      <div className={style.container}>
        <div className={style.mainDiv}>
          <div className={style.firstBox}>
            <p>{name}</p>
            <p>{forecast.current.temp_c}℃</p>
          </div>
          <div className={style.secondBox}>
            <p>{forecast.current.condition.text} </p>
          </div>
          <div className={style.thirdBox}>
            <p> {time.dayOfWeek}</p>
            <p> {time.date}</p>
          </div>
        </div>
        <div className={style.sideBar}>
          <div className={style.topBox}>
            <HomeButton />
          </div>
          <div className={style.bottomBox}>
            <h1>ForeCast</h1>
            <div className={style.dayDiv}>
              {forecast.forecast.forecastday.map((el) => (
                <ul key={el.date} className={style.dayList}>
                  {el.date.slice(5)}
                  <li>{el.day.avgtemp_c}℃</li>
                  <li>{el.day.condition.text}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
