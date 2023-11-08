import revalidate from "@/app/utils/revalidate";

type Props = {
  tag: string;
};

export default function RevalidateButton({ tag }: Props) {
  const handleClick = async () => {
    await revalidate(tag);
  };

  return <button onClick={handleClick}>캐시 비우기</button>;
}
