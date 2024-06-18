import { getFileStream } from "/@/api/minio";
import { getExpire, myIndexedDB } from "/@/utils/fileStream/variable/fileStreamVariable";
import { setBackground } from "/@/utils/fileStream/method/setBackground";

export const getImgUrl = async (filename: string, bucket: string, dom: HTMLElement) => {
  const res = await getFileStream(filename, { bucket });
  const blob = new Blob([res.data], { type: 'image/png' });
  const expires = getExpire();
  const fileObj = {
    expires,
    key: blob,
  };
  myIndexedDB.setItem(filename, fileObj);
  setBackground(fileObj, dom);
};
