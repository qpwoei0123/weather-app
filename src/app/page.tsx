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
        className="fixed left-0 top-0 -z-10 h-screen w-screen object-cover"
      />
      <div className="flexCenter h-screen w-screen flex-col  text-white lg:flex-row">
        <section
          className="g:h-full flex
          h-full w-full 
          flex-col text-4xl 
       font-medium lg:w-4/5 lg:text-5xl "
        >
          <div className="m-4 flex flex-grow flex-col ">
            <p className="">London</p>
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

        <section className="flexCenter m-5  h-1/4 w-11/12 rounded-3xl shadow-2xl backdrop-blur-sm lg:m-10 lg:h-5/6 lg:w-1/5">
          <div className="lg:flexCol flexRow  h-full w-full items-center justify-evenly ">
            {forecast.forecast.forecastday.map((el) => (
              <ul
                key={el.date}
                className="flexCol items-center text-xs lg:text-base  "
              >
                <li className="mb-3">
                  {`${el.date.slice(5, 7)}/${el.date.slice(8, 10)}`}
                </li>

                <li className="list-none tracking-widest">
                  {el.day.condition.text}
                </li>
                <li className="list-none tracking-widest">
                  최고: {el.day.maxtemp_c}℃
                </li>
                <li className="ist-none  tracking-widest">
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
