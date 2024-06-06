import { all } from './all';
import { immediate } from './immediate';

export function map<T, S>(items: T[], cb: (item: T, i: number) => S | Promise<S>): Promise<S[]>;

export function map<T, S>(items: T[], cb: (item: T, i: number) => S | Promise<S>, concurrency: number): Promise<S[]>;

export function map<T, S>(items: T[], cb: (item: T, i: number) => S | Promise<S>, concurrency?: number): Promise<S[]> {
  if (concurrency === undefined) {
    return mapAll(items, cb);
  }

  return mapConcurrence(items, cb, concurrency);
}

function mapAll<T, S>(items: T[], cb: (item: T, i: number) => S | Promise<S>): Promise<S[]> {
  return all(
    items.map((item: T, i: number) => {
      return cb(item, i);
    }),
  );
}

async function mapConcurrence<T, S>(
  items: T[],
  cb: (item: T, i: number) => S | Promise<S>,
  concurrency: number,
): Promise<S[]> {
  let index: number = 0;
  const results: S[] = [];
  const pending: Promise<void | null>[] = [];

  while (concurrency-- > 0) {
    const thread = helper();
    if (thread) pending.push(thread);
    else break;
  }

  return Promise.all(pending).then(() => results);

  function helper(): Promise<void | null> | null {
    if (index >= items.length) return null;
    const i = index++;
    return (async (): Promise<S> => cb(items[i], i))().then((resolved: S) => {
      results[i] = resolved;
      return helper();
    });
  }
}
