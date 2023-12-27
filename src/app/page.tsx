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
        className="fixed top-0 left-0 w-screen h-screen -z-10"
      />
      <div className="flexCenter w-screen h-screen bg-cover text-white">
        <div className="flex flex-col w-4/5 h-full font-medium text-3xl font-">
          <div className="flex-grow flex flex-col m-4">
            <p className="text-7xl font-extrabold">{forecast.location.name}</p>
            <p className="text-5xl ml-2">{forecast.current.temp_c}℃</p>
          </div>
          <div className="flexCenter font-light flex-grow ">
            <p>{forecast.current.condition.text} </p>
          </div>
          <div className="flex-grow flexEnd flex-col m-4 font-extrabold">
            <p> {time.dayOfWeek}</p>
            <p> {time.date}</p>
          </div>
        </div>
        <div className="w-1/5 h-full flexCol items-center backdrop-blur-sm shadow-2xl">
          <div className="flex-grow flexCenter flex-col">
            <Image
              className="w-12 animate-bounce"
              src={locationIcon}
              alt="Icon"
            />
            <MyCityDiv />
          </div>
          <div className="flexCol justify-center w-full">
            {forecast.forecast.forecastday.map((el) => (
              <ul
                key={el.date}
                className="flexCol items-center font-bold text-2xl mb-12"
              >
                {`${el.date.slice(5, 7)}/${el.date.slice(8, 10)}`}
                <li className="list-none mt-1 font-medium text-sm tracking-widest">
                  {el.day.condition.text}
                </li>
                <li className="list-none mt-1 font-medium text-sm tracking-widest">
                  최고: {el.day.maxtemp_c}℃
                </li>
                <li className="list-none mt-1 font-medium text-sm tracking-widest">
                  최저: {el.day.mintemp_c}℃
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
