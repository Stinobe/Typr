import { Source } from "./source-base";

export const sort = (a: Source, b: Source) => {
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
};

export const getRandom = (list: any[]) => {
  const min = Math.ceil(0);
  const max = Math.floor(list.length);
  const random = Math.floor(Math.random() * (max - min) + min);
  return list[random];
};

export default {
  sort,
};
