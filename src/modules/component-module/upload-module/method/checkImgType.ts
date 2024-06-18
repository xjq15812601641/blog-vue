import { isImgTypeByName } from "/@/components/Upload/src/helper";

export function checkImgType(file: File) {
  return isImgTypeByName(file.name);
}
