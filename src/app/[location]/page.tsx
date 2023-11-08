import HomeButton from "@/component/HomeButton";
import { getForecast } from "../utils/getForecast";

type Props = {
  params: {
    location: string;
  };
  searchParams: {
    name: string;
  };
};

export function generateMetadata({ searchParams }: Props) {
  return {
    title: `날씨앱 - ${searchParams.name}`,
    discription: `${searchParams.name} 의날씨를 알려드림`,
  };
}

export default async function Detail({ params, searchParams }: Props) {
  const name = searchParams.name;
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
