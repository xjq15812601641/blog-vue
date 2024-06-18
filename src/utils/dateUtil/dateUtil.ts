import dayjs from "dayjs";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "/@/utils/dateUtil/variable/dateUtilVariable";

export class DateUtil {
  static formatToDateTime(
    date: dayjs.Dayjs | string | undefined = undefined,
    format = DATE_TIME_FORMAT,
  ): string {
    return dayjs(date).format(format);
  }

  static formatToDate(
    date: dayjs.Dayjs | string | undefined = undefined,
    format = DATE_FORMAT,
  ): string {
    return dayjs(date).format(format);
  }
  static getDateUtil(val? :any) {
    return dayjs(val);
  }
}
