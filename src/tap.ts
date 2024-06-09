export function tap<T, S>(fn: (arg: S) => Promise<T> | T) {
  return async (value: S): Promise<S> => {
    return Promise.resolve(fn(value)).then(() => value);
  };
}
