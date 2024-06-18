export function useImgLoadError() {
  const handleImg = (e) => {
    e.target.src = 'https://www.freeimg.cn/i/2024/01/31/65ba39b1d62c8.png';
  };
  return { handleImg };
}
