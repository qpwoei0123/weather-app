type DateObject = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export default function convertStringToDate(isoDateString: string): DateObject {
  const date = new Date(isoDateString);

  const dateObject: DateObject = {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // 월은 0부터 시작하므로 1을 더해줍니다.
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
  };

  return dateObject;
}
