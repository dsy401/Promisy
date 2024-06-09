import { delay } from './delay';

export type RetryOptions = {
  maxAttempts: number;
  delayInMilliseconds?: number;
};

export async function retry<T>(
  fn: () => T | PromiseLike<T>,
  { maxAttempts, delayInMilliseconds }: RetryOptions,
): Promise<Awaited<T>> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i < maxAttempts - 1) {
        await delay(delayInMilliseconds ?? 1000);
        continue;
      }

      throw error;
    }
  }

  throw new Error('Max attempt must be larger than zero.');
}
