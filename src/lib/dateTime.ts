import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const dateTime = (datetime: string) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const jtcDate = dayjs.utc(datetime).tz("Asia/Tokyo").format("YYYY/MM/DD");
  return jtcDate;
};
