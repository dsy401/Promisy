import { all } from '../all';

describe('all', () => {
  it('should be able to resolve correctly', async () => {
    const [r1, r2, r3] = await all([Promise.resolve('1'), Promise.resolve(2), Promise.resolve(true)]);

    expect(r1).toEqual('1');
    expect(r2).toEqual(2);
    expect(r3).toEqual(true);
  });

  it('should be able to run concurrently', async () => {
    const beforeDate = Date.now();
    await all([
      new Promise<void>((resolve) => {
        setTimeout(() => {
          return resolve();
        }, 1000);
      }),
      new Promise<void>((resolve) => {
        setTimeout(() => {
          return resolve();
        }, 2000);
      }),
    ]);
    const afterDate = Date.now();

    const timeRun = afterDate - beforeDate;

    expect(timeRun).toBeGreaterThan(1900);
    expect(timeRun).toBeLessThan(2100);
  });
});
