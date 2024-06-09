import { all } from './all';

export async function filter<T>(items: T[], cb: (item: T, i: number) => Promise<boolean> | boolean): Promise<T[]> {
  if (items.length === 0) return [];

  const promises: (Promise<boolean> | boolean)[] = [];

  for (let i = 0; i < items.length; i++) {
    promises.push(cb(items[i], i));
  }

  const results = await all(promises);

  return results.reduce((acc: T[], conditionResult: boolean, i: number) => {
    if (conditionResult) {
      acc.push(items[i]);
    }

    return acc;
  }, []);
}
