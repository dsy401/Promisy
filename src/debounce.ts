export function debounce<T, S extends unknown[] | []>(
  fn: (...args: S) => Promise<void> | void,
  delay: number,
): (...args: S) => Promise<void> {
  let timeout: NodeJS.Timeout | undefined = undefined;

  return async (...args: S): Promise<void> => {
    clearTimeout(timeout);

    await new Promise<void>((resolve) => {
      timeout = setTimeout(() => {
        resolve(fn(...args));
      }, delay);
    });
  };
}
