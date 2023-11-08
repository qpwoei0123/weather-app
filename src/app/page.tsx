import Link from "next/link";
import style from "./style.module.css";
import { getCurrentWeather } from "./utils/getCrurrentWeather";
import { getTime } from "./utils/getTime";
import RevalidateButton from "@/component/RevalidateButton";

export default async function Home() {
  const res = await getCurrentWeather("seoul");
  const time = await getTime(res.location.tz_id);
  return (
    <>
      <h1>날씨 앱</h1>
      {time.dateTime}
      <ul className={style.list}>
        <li>
          <Link href="seoul">서울</Link>
          {res.current.condition.text}
        </li>
        <li>
          <Link href="newyork">뉴옥</Link>
        </li>
        <li>
          <Link href="rondon">런던</Link>
        </li>
      </ul>
      <RevalidateButton tag={"time"} />
    </>
  );
}
