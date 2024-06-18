import * as localforage from "localforage";

export const myIndexedDB = localforage.createInstance({
  name: 'myIndexedDB',
});

export const getExpire = () => Date.now() + 3600 * 1000 * 24 * 7;
