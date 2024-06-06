export function all<T extends readonly unknown[] | []>(
  values: T,
): Promise<{
  [P in keyof T]: Awaited<T[P]>;
}>;

export function all<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]> {
  return Promise.all(values);
}
