import Link from "next/link";
import style from "./style.module.css";
import { getCurrentWeather } from "./utils/getCrurrentWeather";
import { getTime } from "./utils/getTime";
import RevalidateButton from "@/component/RevalidateButton";
import MyCityDiv from "../component/MyCityDiv";

export default async function Home() {
  const res = await getCurrentWeather(35.65868065268432, 139.7020851738114);
  console.log(res);
  const time = await getTime(res.location.tz_id);

  return (
    <div className={style.box}>
      <ul className={style.list}>
        <li>
          <Link href="seoul?name=서울" className={style.link}>
            {res.location.name}
          </Link>
          <p>{res.current.temp_c}℃</p>

          <img src={res.current.condition.icon} alt={"날씨 아이콘"} />

          <p>{res.current.condition.text} </p>
          <p> {time.date}</p>

          <p> {time.year}</p>
          <p> {time.month}</p>
          <p> {time.day}</p>
          <p> {time.dayOfWeek}</p>
          <p> {time.time}</p>
        </li>
      </ul>
      <RevalidateButton tag={"current"} />
      <MyCityDiv />
    </div>
  );
}
