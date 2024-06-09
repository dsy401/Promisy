import { retry } from '../retry';

describe('retry', () => {
  const fnMock = jest.fn();
  const maxAttempt = 3;
  let i = 1;

  const fn = async <T>(value: T) => {
    return new Promise<T>((resolve, reject) => {
      setTimeout(() => {
        fnMock();
        if (i === maxAttempt) {
          return resolve(value);
        }

        i += 1;
        return reject(new Error('Something went wrong'));
      }, 500);
    });
  };

  beforeEach(() => {
    i = 1;
    jest.clearAllMocks();
  });

  it('should throw if max attempt is 0', async () => {
    await expect(
      retry(() => fn('resolved'), {
        maxAttempts: 0,
      }),
    ).rejects.toThrow(new Error('Max attempt must be larger than zero.'));
  });

  it('should be able to retry', async () => {
    const r = await retry(() => fn('resolved'), {
      maxAttempts: 3,
    });

    expect(r).toEqual('resolved');

    expect(fnMock).toHaveBeenCalledTimes(3);
  });

  it('should throw if retry will be still failed', async () => {
    await expect(
      retry(() => fn('resolved'), {
        maxAttempts: 2,
      }),
    ).rejects.toThrow(new Error('Something went wrong'));

    expect(fnMock).toHaveBeenCalledTimes(2);
  });

  it('should have specific interval before retrying', async () => {
    const beforeDate = Date.now();

    const r = await retry(() => fn('resolved'), {
      maxAttempts: 3,
      delayInMilliseconds: 500,
    });

    const afterDate = Date.now();

    const timeRun = afterDate - beforeDate;
    expect(timeRun).toBeGreaterThan(2400);
    expect(timeRun).toBeLessThan(2600);

    expect(r).toEqual('resolved');

    expect(fnMock).toHaveBeenCalledTimes(3);
  });
});
