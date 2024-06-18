export function pagination<T = any>(list: T[], pageNo: number, pageSize: number): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= list.length
      ? list.slice(offset, list.length)
      : list.slice(offset, offset + Number(pageSize));
  return ret;
}
