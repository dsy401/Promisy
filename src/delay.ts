export async function delay<T>(milliseconds: number): Promise<void>;
export async function delay<T>(milliseconds: number, value: T): Promise<T>;
export async function delay<T>(milliseconds: number, value?: T): Promise<T | void> {
  return new Promise<T | void>((resolve) => {
    setTimeout(() => {
      return resolve(value);
    }, milliseconds);
  });
}
