export function toggleClass(flag: boolean, clsName: string) {
  const targetEl = document.documentElement || document.body;
  let { className } = targetEl;
  className = className.replace(clsName, '');
  targetEl.className = flag ? `${className} ${clsName} ` : className;
}
