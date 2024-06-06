import { mapEach } from '../mapEach';

describe('mapEach', () => {
  it('should be able to map sequentially', async () => {
    const timeArr = [100, 200, 300, 400];
    const timeSum = timeArr.reduce((sum, time) => sum + time, 0);

    const beforeDate = Date.now();
    const mockFn = jest.fn();

    const r = await mapEach(timeArr, async (time) => {
      return new Promise<number>((resolve) => {
        setTimeout(() => {
          mockFn();
          return resolve(time);
        }, time);
      });
    });

    const afterDate = Date.now();
    const timeRun = afterDate - beforeDate;
    expect(timeRun).toBeGreaterThan(timeSum - 100);
    expect(timeRun).toBeLessThan(timeSum + 100);

    expect(mockFn).toHaveBeenCalledTimes(timeArr.length);

    expect(r).toEqual(timeArr);
  });
});
