function extend<T, K>(to: T, _from: K): T & K {
  return Object.assign(to, _from);
}
