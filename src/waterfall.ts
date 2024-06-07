type PreviousReturnAsParamFunc<T, S> = (arg: Awaited<T>) => S;

export function waterfall<T>(
  fn: T,
): (
  ...args: T extends (...args: infer P) => any ? P : never
) => Promise<T extends (...args: any[]) => infer R ? Awaited<R> : never>;

export function waterfall<A, B>(
  fn1: A,
  fn2: (arg: A extends (...args: any[]) => infer R ? Awaited<R> : never) => B,
): (...args: A extends (...args: infer P) => any ? P : never) => Promise<Awaited<B>>;

export function waterfall<A, B, C>(
  fn1: A,
  fn2: (arg: A extends (...args: any[]) => infer R ? Awaited<R> : never) => B,
  fn3: PreviousReturnAsParamFunc<B, C>,
): (...args: A extends (...args: infer P) => any ? P : never) => Promise<Awaited<C>>;

export function waterfall<A, B, C, D>(
  fn1: A,
  fn2: (arg: A extends (...args: any[]) => infer R ? Awaited<R> : never) => B,
  fn3: PreviousReturnAsParamFunc<B, C>,
  fn4: PreviousReturnAsParamFunc<C, D>,
): (...args: A extends (...args: infer P) => any ? P : never) => Promise<Awaited<D>>;

export function waterfall<A, B, C, D, E>(
  fn1: A,
  fn2: (arg: A extends (...args: any[]) => infer R ? Awaited<R> : never) => B,
  fn3: PreviousReturnAsParamFunc<B, C>,
  fn4: PreviousReturnAsParamFunc<C, D>,
  fn5: PreviousReturnAsParamFunc<D, E>,
): (...args: A extends (...args: infer P) => any ? P : never) => Promise<Awaited<E>>;

export function waterfall<A, B, C, D, E, F>(
  fn1: A,
  fn2: (arg: A extends (...args: any[]) => infer R ? Awaited<R> : never) => B,
  fn3: PreviousReturnAsParamFunc<B, C>,
  fn4: PreviousReturnAsParamFunc<C, D>,
  fn5: PreviousReturnAsParamFunc<D, E>,
  fn6: PreviousReturnAsParamFunc<E, F>,
): (...args: A extends (...args: infer P) => any ? P : never) => Promise<Awaited<F>>;

export function waterfall<A, B, C, D, E, F, Rest extends unknown[] | []>(
  fn1: A,
  fn2: (arg: A extends (...args: any[]) => infer R ? Awaited<R> : never) => B,
  fn3: PreviousReturnAsParamFunc<B, C>,
  fn4: PreviousReturnAsParamFunc<C, D>,
  fn5: PreviousReturnAsParamFunc<D, E>,
  fn6: PreviousReturnAsParamFunc<E, F>,
  ...fns: Rest
): (
  ...args: Rest extends [infer F, ...any[]] ? (F extends (...args: infer P) => any ? P : never) : never
) => Promise<Rest extends [...any[], infer L] ? (L extends (...args: any[]) => infer R ? Awaited<R> : never) : never>;

export function waterfall(...fns: any[]): Function {
  return async (...args: any[]): Promise<any> => {
    if (fns.length === 0) {
      return;
    }

    let r = await fns[0](...args);

    for (let i = 1; i < fns.length; i++) {
      r = await fns[i](r);
    }

    return r;
  };
}
