import Image from "next/image";
import style from "./style.module.css";
import { getForecast } from "./utils/getForecast";
import { getTime } from "./utils/getTime";
import MyCityDiv from "../component/MyCityDiv";
import locationIcon from "../asset/Location.png";
import { getWeatherImg } from "./utils/getWeatherImg";

export default async function Home() {
  const forecast = await getForecast(51.507992, -0.128124);
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
            <p>{forecast.location.name}</p>
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
            <Image src={locationIcon} alt="Icon" />
            <MyCityDiv />
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
