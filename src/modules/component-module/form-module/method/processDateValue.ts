import { DATE_TYPE } from "/@/modules/component-module/form-module/variable/formVariable";
import { isObject } from "/@/utils/is/is";
import { DateUtil } from "/@/utils/dateUtil/dateUtil";

export function processDateValue(attr: Recordable, component: string) {
  const { valueFormat, value } = attr;
  if (valueFormat) {
    attr.value = isObject(value) ? DateUtil.getDateUtil(value as Date).format(valueFormat) : value;
  } else if (DATE_TYPE.includes(component) && value) {
    attr.value = DateUtil.getDateUtil(attr.value);
  }
}
