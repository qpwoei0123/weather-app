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
      className="flexCol items-center text-xs font-bold lg:text-base "
    >
      <li className="mb-2">{`${el.date.slice(5, 7)}/${el.date.slice(
        8,
        10,
      )}`}</li>
      <li className="list-none tracking-widest">{el.day.condition.text}</li>
      <li className="list-none tracking-widest">최고: {el.day.maxtemp_c}℃</li>
      <li className="list-none tracking-widest">최저: {el.day.mintemp_c}℃</li>
    </ul>
  );
};

export default WeatherCard;
