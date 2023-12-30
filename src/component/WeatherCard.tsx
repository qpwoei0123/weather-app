import React from "react";

type Props = {
  el: {
    date: string;
    day: {
      condition: {
        text: string;
      };
      maxtemp_c: number;
      mintemp_c: number;
    };
  };
};

const WeatherCard: React.FC<Props> = ({ el }) => {
  return (
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
  );
};

export default WeatherCard;
