import { delay } from './delay';

export async function immediate<T>(value: T): Promise<T>;
export async function immediate<T>(): Promise<void>;

export async function immediate<T>(value?: T): Promise<T | void> {
  return delay(0, value);
}
