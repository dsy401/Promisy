import { timeout } from '../timeout';

describe('timeout', () => {
  const p = async <T>(value: T): Promise<T> => {
    return new Promise<T>((resolve) => {
      setTimeout(() => {
        return resolve(value);
      }, 1000);
    });
  };

  it('should be able to return value if time is not exceeded', async () => {
    const r = await timeout(() => p('test'), 1500);

    expect(r).toEqual('test');
  });

  it('should be able to throw default error if time is exceeded', async () => {
    await expect(timeout(() => p('test'), 800)).rejects.toThrow(new Error('The operation is timeout'));
  });

  it('should be able to throw custom error if time is exceeded', async () => {
    const error = new Error('Something went wrong');
    await expect(timeout(() => p('test'), 800, error)).rejects.toThrow(error);
  });
});
