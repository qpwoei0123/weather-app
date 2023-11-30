import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";
import { getForecast } from "./utils/getForecast";
import { getCurrentWeather } from "./utils/getCrurrentWeather";
import { getTime } from "./utils/getTime";
import MyCityDiv from "../component/MyCityDiv";
import locationIcon from "../asset/Location.png";
import { getWeatherImg } from "./utils/getWeatherImg";

export default async function Home() {
  const res = await getCurrentWeather(35.65868065268432, 139.7020851738114);
  const time = await getTime(res.location.tz_id);
  const forecast = await getForecast(35.65868065268432, 139.7020851738114);
  const weatherSrc = await getWeatherImg(res.current.condition.code);

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
            {/* <Link href="seoul?name=서울" className={style.link}>
            {res.location.name}
          </Link> */}
            <p>{res.location.name}</p>
            <p>{res.current.temp_c}℃</p>
          </div>
          <div className={style.secondBox}>
            <p>{res.current.condition.text} </p>
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
            {forecast.forecast.forecastday.map((el) => (
              <div key={el.date} className={style.day}>
                <ul>
                  {el.date.slice(5)}
                  <li>{el.day.avgtemp_c}℃</li>
                  <li>{el.day.condition.text}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
