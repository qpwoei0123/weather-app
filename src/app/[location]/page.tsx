import { getForecast } from "../utils/getForecast";
import Image from "next/image";
import { getTime } from "../utils/getTime";
import { getWeatherImg } from "../utils/getWeatherImg";
import { RealTimeClock } from "@/component/RealTimeClock";
import Cursor from "@/component/Cursor";
import WeatherCard from "@/component/WeatherCard";

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
        className="fixed left-0 top-0 -z-10 h-screen w-screen object-cover"
      />
      <div className="flexCenter h-screen w-screen flex-col  text-white lg:flex-row">
        <section
          className="g:h-full flex
             h-full w-full 
             flex-col text-4xl 
          font-medium lg:w-4/5 lg:text-5xl "
        >
          <div className="m-4 flex flex-grow flex-col">
            <p className="">{name}</p>
            <p className=""> {forecast.current.temp_c}℃</p>
          </div>
          <div className="flexCenter flex-grow lg:text-3xl">
            <p>{forecast.current.condition.text} </p>
          </div>
          <div className="flexEnd m-4 flex-grow flex-col">
            <p> {time.dayOfWeek}</p>
            <p> {time.date}</p>
          </div>
        </section>
        <section className="m-5 h-1/4 w-11/12 rounded-3xl shadow-2xl backdrop-blur-sm lg:m-10 lg:h-5/6 lg:w-1/5">
          <div className="lg:flexCol flexRow  h-full w-full items-center justify-evenly">
            {forecast.forecast.forecastday.map((el, index) => (
              <WeatherCard el={el} key={index} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
