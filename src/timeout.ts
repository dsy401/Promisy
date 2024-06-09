import { race } from './race';

export function timeout<T>(fn: () => T | PromiseLike<T>, milliseconds: number): Promise<Awaited<T>>;
export function timeout<T>(fn: () => T | PromiseLike<T>, milliseconds: number, error: Error): Promise<Awaited<T>>;

export function timeout<T>(fn: () => T | PromiseLike<T>, milliseconds: number, error?: Error): Promise<Awaited<T>> {
  let timeout: NodeJS.Timeout | undefined = undefined;

  return race([
    new Promise<void>((_, reject) => {
      timeout = setTimeout(() => {
        return reject(error ? error : new Error('The operation is timeout'));
      }, milliseconds);
    }),
    (async () => {
      const r = await fn();

      clearTimeout(timeout);

      return r;
    })(),
  ]) as Promise<Awaited<T>>;
}
