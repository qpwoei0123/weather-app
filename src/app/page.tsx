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
          <Link href="seoul?name=서울">서울</Link>
          {res.current.condition.text}
        </li>
        <li>
          <Link href="NYC?name=뉴욕">뉴욕</Link>
        </li>
        <li>
          <Link href="rondon?name=런던">런던</Link>
        </li>
      </ul>
      <RevalidateButton tag={"time"} />
    </>
  );
}
