import { all } from './all';

export async function find<T>(items: T[], cb: (item: T, i: number) => Promise<boolean> | boolean): Promise<T | null> {
  if (items.length === 0) return null;

  const promises: (Promise<boolean> | boolean)[] = [];

  for (let i = 0; i < items.length; i++) {
    promises.push(cb(items[i], i));
  }

  const results = await all(promises);

  const trueIndex = results.findIndex((result) => result === true);

  if (trueIndex === -1) return null;

  return items[trueIndex];
}
