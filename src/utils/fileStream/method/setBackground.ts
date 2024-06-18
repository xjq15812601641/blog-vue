import { FileObj } from "/@/utils/fileStream/interface/FileObj";

export const setBackground = (target: FileObj, dom: HTMLElement) => {
  const url = window.URL.createObjectURL(target.key);
  dom.style['background'] = `url(${url})`;
  dom.style['background-size'] = 'cover';
  dom.style['background-position'] = '50% 50%';
};
