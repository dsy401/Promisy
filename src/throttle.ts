export function throttle<T, S extends unknown[] | []>(
  fn: (...args: S) => Promise<T> | T,
  interval: number,
): (...args: S) => Promise<T> {
  let lastCall = 0;

  return async (...args: S): Promise<T> => {
    const now = Date.now();

    if (now - lastCall >= interval) {
      lastCall = now;
      return fn(...args);
    }

    throw new Error(`The function has been throttled within ${interval} milliseconds`);
  };
}
