import Link from "next/link";
import style from "./style.module.css";
import { getCurrentWeather } from "./utils/getCrurrentWeather";

export default async function Home() {
  const res = await getCurrentWeather("seoul");
  console.log(res.current.condition.text);
  const locations = ["seoul", "newyork", "rondon"];

  return (
    <>
      <h1>날씨 앱</h1>
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
    </>
  );
}
