"use client";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();
  const buttonHandler = () => {
    router.push("/");
  };
  return <button onClick={buttonHandler}>홈으로</button>;
}
