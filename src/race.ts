export function race<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>> {
  return Promise.race(values);
}
