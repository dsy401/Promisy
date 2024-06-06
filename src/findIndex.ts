import { all } from './all';

export async function findIndex<T>(
  items: T[],
  cb: (item: T, i: number) => Promise<boolean> | boolean,
): Promise<number> {
  if (items.length === 0) return -1;

  const promises: (Promise<boolean> | boolean)[] = [];

  for (let i = 0; i < items.length; i++) {
    promises.push(cb(items[i], i));
  }

  const results = await all(promises);

  return results.findIndex((result) => result === true);
}
