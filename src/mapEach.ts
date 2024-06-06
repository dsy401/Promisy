export async function mapEach<T, S>(items: T[], cb: (item: T, i: number) => S): Promise<S[]> {
  const result: S[] = [];

  for (let i = 0; i < items.length; i++) {
    result.push(await cb(items[i], i));
  }

  return result;
}
