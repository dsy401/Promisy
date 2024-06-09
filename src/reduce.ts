import { each } from './each';

export async function reduce<T, S>(
  items: T[],
  cb: (acc: S, item: T, i: number) => Promise<S> | S,
  initial: S,
): Promise<S> {
  if (items.length === 0) return initial;

  await each(items, async (item, i) => {
    initial = await cb(initial, item, i);
  });

  return initial;
}
