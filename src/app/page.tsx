import Link from "next/link";
import style from "./style.module.css";
import { getCurrentWeather } from "./utils/getCrurrentWeather";
import { getTime } from "./utils/getTime";
import RevalidateButton from "@/component/RevalidateButton";

export default async function Home() {
  const res1 = await getCurrentWeather("seoul");
  const res2 = await getCurrentWeather("NYC ");
  const res3 = await getCurrentWeather("rondon");
  const time1 = await getTime(res1.location.tz_id);
  const time2 = await getTime(res2.location.tz_id);
  const time3 = await getTime(res3.location.tz_id);

  return (
    <div className={style.box}>
      <h1>날씨 앱</h1>

      <ul className={style.list}>
        <li>
          <Link href="seoul?name=서울" className={style.link}>
            서울
          </Link>
          <p>{res1.current.condition.text} </p>
          <p> {time1.dateTime}</p>
        </li>

        <li>
          <Link href="NYC?name=뉴욕" className={style.link}>
            뉴욕
          </Link>
          <p>{res2.current.condition.text} </p>
          <p> {time2.dateTime}</p>
        </li>
        <li>
          <Link href="rondon?name=런던" className={style.link}>
            런던
          </Link>
          <p>{res3.current.condition.text} </p>
          <p> {time3.dateTime}</p>
        </li>
      </ul>
      <RevalidateButton tag={"time"} />
    </div>
  );
}
