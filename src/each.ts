export async function each<T, S>(items: T[], cb: (item: T, i: number) => S | Promise<S>): Promise<void> {
  for (let i = 0; i < items.length; i++) {
    await cb(items[i], i);
  }
}
