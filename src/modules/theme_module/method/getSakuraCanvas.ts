import { Sakura } from '/@/modules/theme_module/interface/sakuraTheme/Sakura';

export function getSakuraCanvas() {
  const contentBox = document.querySelector('#app');
  if (!contentBox) return;
  let boxWidth = contentBox.clientWidth - 10;
  let boxHeight = contentBox.scrollHeight;
  /**
   * sakuraList:雪花
   */
  const sakuraList: Sakura[] = [];

  const createCanvas = () => {
    const sakuraImg = getSakuraImage();
    const canvas = setCanvas();
    contentBox.appendChild(canvas);
    function setCanvas() {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.zIndex = '99999';
      canvas.style.pointerEvents = 'none';
      canvas.width = boxWidth - 10;
      canvas.height = boxHeight;
      canvas.style.position = 'fixed';
      canvas.style.pointerEvents = 'none';
      return canvas;
    }
    const ctx = canvas.getContext('2d');
    function createSakura(scale: number) {
      const sakura: Sakura = {
        x: parseInt(Math.random() * boxWidth),
        y: parseInt(Math.random() * boxHeight),
        speedX: Math.random() * 2,
        speedY: Math.random() * 3,
        scale: scale,
        width: scale,
        height: scale,
      };
      sakuraImg.onload = () => {
        ctx && ctx.drawImage(sakuraImg, sakura.x, sakura.y, sakura.width, sakura.height);
      };
      return sakura;
    }
    function getSakuraImage() {
      return new Image();
    }
    function defineSakuraSum() {
      const scales = [7.5, 10, 12.5, 15, 17.5, 20];
      for (let i = 0; i < 100; i++) {
        sakuraList.push(createSakura(scales[Math.floor(Math.random() * 5)]));
      }
    }
    defineSakuraSum();
    function update() {
      if (!canvas || !ctx) return;
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      sakuraList &&
        sakuraList.forEach(function (e) {
          e.x = e.x + e.speedX >= canvas.width ? Math.random() * canvas.width : e.x + e.speedX;
          e.y = e.y >= canvas.height ? 0 : e.y + e.speedY;
          ctx.drawImage(sakuraImg, e.x, e.y, e.width, e.height);
        });
    }
    const timer = setInterval(update, 20);
    const stopSakura = () => {
      clearInterval(timer);
    };
    return { stopSakura };
  };

  window.addEventListener('resize', () => {
    boxWidth = contentBox.clientWidth;
    boxHeight = contentBox.scrollHeight;
    const target = contentBox.querySelector('canvas');
    if (!target) return;
    stopSakura();
    contentBox.removeChild(target);
    setTimeout(createCanvas, 200);
  });
  const { stopSakura } = createCanvas();

  createCanvas();
}
