/* 判断图片是否能请求成功 */
export default (url: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = (res) => {
      resolve(res);
    };
    img.onerror = (err) => {
      reject(err);
    };
  }).catch(() => {});
};
