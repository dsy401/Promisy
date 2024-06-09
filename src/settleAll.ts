import { all } from './all';

type SettledResult<T> = SettledFulfilledResult<T> | SettledRejectedResult;

enum PromiseStatus {
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

type SettledFulfilledResult<T> = {
  status: PromiseStatus.FULFILLED;
  value: T;
};

type SettledRejectedResult = {
  status: PromiseStatus.REJECTED;
  reason: any;
};

export function settleAll<T extends readonly unknown[] | []>(
  values: T,
): Promise<{
  [P in keyof T]: SettledResult<Awaited<T[P]>>;
}>;

export function settleAll<T extends readonly unknown[] | []>(values: T): Promise<SettledResult<unknown>[]> {
  const handledPromises = values.map(async (p) => {
    try {
      const fulfilledResult: SettledFulfilledResult<unknown> = {
        status: PromiseStatus.FULFILLED,
        value: await p,
      };
      return fulfilledResult;
    } catch (error) {
      const rejectedResult: SettledRejectedResult = {
        status: PromiseStatus.REJECTED,
        reason: error,
      };

      return rejectedResult;
    }
  });

  return all(handledPromises);
}
