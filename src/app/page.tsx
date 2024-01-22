import Image from "next/image";
import { getForecast } from "./utils/getForecast";
import { getTime } from "./utils/getTime";
import { getWeatherImg } from "./utils/getWeatherImg";
import { Modal } from "../component/Modal";

export default async function Home() {
  const forecast = await getForecast(51.507992, -0.128124);
  const time = await getTime(forecast.location.tz_id);
  const weatherSrc = await getWeatherImg(forecast.current.condition.code);

  return (
    <>
      <Modal />
      <Image
        src={weatherSrc}
        alt="backgroundImg"
        className="fixed left-0 top-0 -z-10 h-screen w-screen"
      />
      <div className="flexCenter h-screen w-screen flex-col  text-white lg:flex-row">
        <section
          className="flex h-3/4 
          w-full flex-col 
          text-3xl font-medium 
          lg:h-full lg:w-4/5 "
        >
          <div className="m-4 flex flex-grow flex-col">
            <p className="text-7xl font-extrabold">Rondon</p>
            <p className="ml-2 text-5xl"> {forecast.current.temp_c}℃</p>
          </div>
          <div className="flexCenter flex-grow font-light">
            <p>{forecast.current.condition.text} </p>
          </div>
          <div className="flexEnd m-4 flex-grow flex-col font-extrabold">
            <p> {time.dayOfWeek}</p>
            <p> {time.date}</p>
          </div>
        </section>

        <section className="lg:flexCol h-1/4 w-full flex-row items-center justify-center shadow-2xl backdrop-blur-sm lg:h-full lg:w-1/5">
          <div className="lg:flexCol flexRow hidden w-full items-center justify-evenly lg:block lg:justify-center">
            {forecast.forecast.forecastday.map((el) => (
              <ul
                key={el.date}
                className="flexCol m-0 items-center text-2xl font-bold lg:mb-8 "
              >
                {`${el.date.slice(5, 7)}/${el.date.slice(8, 10)}`}
                <li className="mt-1 list-none text-sm font-medium tracking-widest">
                  {el.day.condition.text}
                </li>
                <li className="mt-1 list-none text-sm font-medium tracking-widest">
                  최고: {el.day.maxtemp_c}℃
                </li>
                <li className="mt-1 list-none text-sm font-medium tracking-widest">
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
