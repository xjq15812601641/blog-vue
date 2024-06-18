export function entries<T>(obj: Recordable<T>): [string, T][] {
  return Object.keys(obj).map((key: string) => [key, obj[key]]);
}
