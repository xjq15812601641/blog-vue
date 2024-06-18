import { CellFormat } from "/@/modules/component-module/table-module/variable/tableVariable";
import { isFunction, isMap, isString } from "/@/utils/is/is";
import { DateUtil } from "/@/utils/dateUtil/dateUtil";

export function formatCell(text: string, format: CellFormat, record: Recordable, index: number) {
  if (!format) {
    return text;
  }

  // custom function
  if (isFunction(format)) {
    return format(text, record, index);
  }

  try {
    // date type
    const DATE_FORMAT_PREFIX = 'date|';
    if (isString(format) && format.startsWith(DATE_FORMAT_PREFIX)) {
      const dateFormat = format.replace(DATE_FORMAT_PREFIX, '');

      if (!dateFormat) {
        return text;
      }
      return DateUtil.formatToDate(text, dateFormat);
    }

    // Map
    if (isMap(format)) {
      return format.get(text);
    }
  } catch (error) {
    return text;
  }
}
