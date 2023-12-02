"use client";
import { useRouter } from "next/navigation";
import style from "./style.module.css";

export default function HomeButton() {
  const router = useRouter();
  const buttonHandler = () => {
    router.push("/");
  };
  return <button onClick={buttonHandler}>home</button>;
}
