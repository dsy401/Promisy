import { each } from '../each';

describe('each', () => {
  it('should be able to run sequentially', async () => {
    const timeArr = [100, 200, 300, 400];
    const timeSum = timeArr.reduce((sum, time) => sum + time, 0);

    const beforeDate = Date.now();
    const mockFn = jest.fn();

    await each(timeArr, async (time) => {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          mockFn();
          return resolve();
        }, time);
      });
    });

    const afterDate = Date.now();
    const timeRun = afterDate - beforeDate;
    expect(timeRun).toBeGreaterThan(timeSum - 100);
    expect(timeRun).toBeLessThan(timeSum + 100);

    expect(mockFn).toHaveBeenCalledTimes(timeArr.length);
  });
});
