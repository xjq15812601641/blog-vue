import { Drip } from '/@/modules/theme_module/interface/rainTheme/Drip';
import { Line } from '/@/modules/theme_module/interface/rainTheme/Line';

export function getRainCanvas() {
  /**
   * 获取id为app的dom对象,根据其创建一个新的宽高
   */
  const contentBox = document.querySelector('#app');
  if (!contentBox) return;
  let boxWidth = contentBox.clientWidth - 10;
  let boxHeight = contentBox.scrollHeight;
  /**
   * dripList:雨滴下落后散成小水珠
   * lineList:每个雨滴
   * mousePosition:鼠标实时位置
   * speedx：落雨方向，缓慢改变
   * direction：落雨要对标方向
   */
  const dripList: Drip[] = [];
  const lineList: Line[] = [];
  const mousePosition = [0, 0];
  let speedx = 0;
  let direction = 0;

  const createCanvas = () => {
    /**
     * 创建一个最顶层的指定宽高的组件canvas，并挂载在app下
     * 为组件canvas设置一个2d画图
     */
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
    window.onmousemove = function (e) {
      /**
       *实时获取鼠标的x,y
       * 通过鼠标的x,y设置落雨要对标的方向
       */
      canvas &&
        ((mousePosition[0] = e.clientX),
        (mousePosition[1] = e.clientY),
        (direction = (e.clientX - canvas.clientWidth / 2) / (canvas.clientWidth / 2)));
    };
    function createRainLine(e) {
      /**
       * rainLineSpeed:雨滴下落速度为16.5-49.5
       * rainLineLength:设置雨滴长度为12.5-37.5
       */
      const line: Line = {
        rainLineSpeed: 5.5 * (Math.random() * 6 + 3),
        rainLineDie: false,
        rainLineX: e,
        rainLineY: -50,
        rainLineLength: 0.25 * (50 + Math.random() * 100),
        rainLineColor: 'rgb(73,73,73)',
      };
      lineList.push(line);
    }
    function createRainDrip(x, y) {
      /**
       * rainDripVX:-4到4
       * rainDripVY:-9到-3
       * rainDripRadius:1到2.5
       */
      const drip: Drip = {
        rainDripDie: false,
        rainDripX: x,
        rainDripY: y,
        rainDripVX: (Math.random() - 0.5) * 8,
        rainDripVY: Math.random() * -6 - 3,
        rainDripRadius: Math.random() * 1.5 + 1,
      };
      return drip;
    }
    function defineDripSum(x, y) {
      /**
       * 设置5到9个水滴
       */
      for (let i = 0; i < Math.floor(Math.random() * 5 + 5); i++) {
        dripList.push(createRainDrip(x, y));
      }
    }
    function update() {
      if (!canvas || !ctx) return;
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      /**
       * 设置雨滴变化的散开范围和落下范围
       * 设置雨滴超过可视区域就删掉
       */
      dripList &&
        dripList.forEach(function (e) {
          e.rainDripVX = e.rainDripVY + speedx / 2;
          e.rainDripX = e.rainDripX + e.rainDripY;
          e.rainDripVX = e.rainDripVY + 0.5;
          e.rainDripVY = e.rainDripY + e.rainDripVY;
          canvas && e.rainDripY > canvas.clientHeight && (e.rainDripDie = true);
        });
      /**
       * 设置下雨方向变换的速度，取值范围： -1 到 1
       * 当 speedx = maxspeedx时，下雨方向 会 随鼠标移动方向立即改变
       * 删除 die属性为ture 的数组成员
       * 可视区域外的小水珠删除掉
       * 创建雨滴的范围在整个屏幕的-0.5到1.5
       * 雨滴散开的位置随机在屏幕五分之一以外的随机位置
       */
      speedx = speedx + (direction - speedx) / 50;
      for (let i = dripList.length - 1; i >= 0; i--) {
        dripList[i].rainDripDie && dripList.splice(i, 1);
      }
      canvas && createRainLine(Math.random() * 2 * canvas.width - 0.5 * canvas.width);
      const endLine = canvas.clientHeight - (Math.random() * canvas.clientHeight) / 5;
      /**
       * 利用勾股定理 确定一个范围，在这个范围内雨滴会散开形成小水珠
       * e.posx + speedx * e.h 是雨滴x坐标
       * e.posy + e.h 是雨滴y坐标
       */
      lineList.forEach(function (e) {
        const dis = Math.sqrt(
          (e.rainLineX + speedx * e.rainLineLength - mousePosition[0]) *
            (e.rainLineX + speedx * e.rainLineLength - mousePosition[0]) +
            (e.rainLineY + e.rainLineLength - mousePosition[1]) *
              (e.rainLineY + e.rainLineLength - mousePosition[1]),
        );
        /**
         * 如果在dis<35，就删除雨滴，画一些小水珠（圆弧）
         * 如果雨滴超过 结束线，删除雨滴，画一些小水珠（圆弧）
         * 如果 雨滴 超出可视区域就删除掉,否者就增加雨滴的y进度，并控制雨滴方向
         */
        dis < 35 &&
          ((e.rainLineDie = true),
          defineDripSum(e.rainLineX + speedx * e.rainLineLength, e.rainLineY + e.rainLineLength));
        e.rainLineX + e.rainLineLength > endLine &&
          ((e.rainLineDie = true),
          defineDripSum(e.rainLineX + speedx * e.rainLineLength, e.rainLineY + e.rainLineLength));
        canvas && e.rainLineY >= canvas.clientHeight
          ? (e.rainLineDie = true)
          : ((e.rainLineY += e.rainLineSpeed), (e.rainLineX += e.rainLineSpeed * speedx));
      });
      for (let i = lineList.length - 1; i >= 0; i--) {
        lineList[i].rainLineDie && lineList.splice(i, 1);
      }
      render();
      window.requestAnimationFrame(update);
    }
    // 渲染
    function render() {
      if (!ctx || !canvas) return;
      /**
       * 画布为透明
       * 大小和可视区域大小一致
       * 设置画笔宽度为3
       */
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 3;
      lineList.forEach(function (line) {
        if (!ctx || !canvas) return;
        /**
         * 设置画笔颜色
         * 画笔将用于绘制线段
         * 从(posx,posy)开始画
         * 画到(line.posx + line.h * speedx, line.posy + line.h)，speedx来控制方向
         * 开始绘制
         */
        ctx.strokeStyle = line.rainLineColor;
        ctx.beginPath();
        ctx.moveTo(line.rainLineX, line.rainLineY);
        ctx.lineTo(
          line.rainLineX + line.rainLineLength * speedx,
          line.rainLineY + line.rainLineLength,
        );
        ctx.stroke();
      });
      /**
       * 设置雨滴散落大小和颜色
       */
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = '#000000';
      dripList.forEach(function (e) {
        if (!ctx || !canvas) return;
        ctx.beginPath();
        ctx.arc(
          e.rainDripX,
          e.rainDripY,
          e.rainDripRadius,
          Math.random() * Math.PI * 2,
          1 * Math.PI,
        );
        ctx.stroke();
      });
    }

    // 开始调用update函数，更新动画
    window.requestAnimationFrame(update);
  };

  window.addEventListener('resize', () => {
    boxWidth = contentBox.clientWidth;
    boxHeight = contentBox.scrollHeight;
    const target = contentBox.querySelector('canvas');
    if (!target) return;
    stop();
    contentBox.removeChild(target);
    setTimeout(createCanvas, 200);
  });

  createCanvas();
}
