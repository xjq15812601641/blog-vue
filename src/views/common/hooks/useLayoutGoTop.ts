import { Scroll } from "/@/modules/scroll-moduole/scroll";

export default () => {
  const goTop = (to = 0, duration = 200) => {
    const target = document.querySelector('.sup-layout-content')!;
    const { run } = new Scroll({ el: target, to, duration });
    run();
  };

  return {
    goTop,
  };
};
