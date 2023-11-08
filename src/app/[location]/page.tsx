import HomeButton from "@/component/HomeButton";
import { getForecast } from "../utils/getForecast";

type Props = {
  params: {
    location: string;
  };
};

export default async function Detail({ params }: Props) {
  const name = params.location == "seoul" ? "서울" : params.location;
  const res = await getForecast(params.location);

  return (
    <>
      <h1> {name} 의 일기예보 </h1>
      {res.forecast.forecastday.map((el) => (
        <li key={el.date}>
          {el.date} / {el.day.avgtemp_c}
        </li>
      ))}
      <HomeButton />
    </>
  );
}
