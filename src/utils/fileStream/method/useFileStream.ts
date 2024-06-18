import { myIndexedDB } from "/@/utils/fileStream/variable/fileStreamVariable";
import { FileObj } from "/@/utils/fileStream/interface/FileObj";
import { getImgUrl } from "/@/utils/fileStream/method/getImgUrl";
import { setBackground } from "/@/utils/fileStream/method/setBackground";

export const useFileStream = async (
  img: string,
  bucket = 'article-background',
  dom: HTMLElement,
) => {
  try {
    const target = (await myIndexedDB.getItem(img)) as null | FileObj;
    if (target) {
      const expires = target.expires;
      if (Date.now() > expires) {
        await myIndexedDB.removeItem(img);
        await getImgUrl(img, bucket, dom);
      } else {
        setBackground(target, dom);
      }
    } else {
      return await getImgUrl(img, bucket, dom);
    }
  } catch (err) {
    console.log(err);
  }
};
