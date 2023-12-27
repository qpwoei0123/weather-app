import { getForecast } from "../utils/getForecast";
import Image from "next/image";
import { getTime } from "../utils/getTime";
import { getWeatherImg } from "../utils/getWeatherImg";
import { RealTimeClock } from "@/component/RealTimeClock";
import Cursor from "@/component/Cursor";

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
      <Cursor />
      <Image
        src={weatherSrc}
        alt="backgroundImg"
        className="fixed top-0 left-0 w-screen h-screen -z-10"
      />
      <div className="flexCenter w-screen h-screen text-white">
        <section className="flex flex-col w-4/5 h-full font-medium text-3xl">
          <div className="flex-grow flex flex-col m-4">
            <p className="text-7xl font-extrabold">{name}</p>
            <p className="text-5xl ml-2"> {forecast.current.temp_c}℃</p>
          </div>
          <div className="flexCenter font-light flex-grow">
            <p>{forecast.current.condition.text} </p>
          </div>
          <div className="flex-grow flexEnd flex-col m-4 font-extrabold">
            <p> {time.dayOfWeek}</p>
            <p> {time.date}</p>
          </div>
        </section>
        <section className="w-1/5 h-full flexCol items-center backdrop-blur-sm shadow-2xl">
          <div className="flex-grow flexCenter flex-col ">
            <RealTimeClock />
          </div>
          <div className="flexCol justify-center w-full">
            {forecast.forecast.forecastday.map((el) => (
              <ul
                key={el.date}
                className="flexCol items-center font-bold text-2xl mb-8"
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
        </section>
      </div>
    </>
  );
}
