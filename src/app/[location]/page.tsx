import HomeButton from "@/component/HomeButton";

type Props = {
  params: {
    location: string;
  };
};

export default function Detail({ params }: Props) {
  const name = params.location == "seoul" ? "서울" : params.location;

  return (
    <>
      <h1> {name} 의 일기예보 </h1>
      <HomeButton />
    </>
  );
}
