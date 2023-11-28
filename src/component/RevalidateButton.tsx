"use client";
import revalidate from "@/app/utils/revalidate";
import style from "./style.module.css";

type Props = {
  tag: string;
};

export default function RevalidateButton({ tag }: Props) {
  const handleClick = async () => {
    await revalidate(tag);
    window.location.reload();
  };

  return (
    <div className={style.box}>
      <button onClick={handleClick}>캐시 비우기</button>
    </div>
  );
}
