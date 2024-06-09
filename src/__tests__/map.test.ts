import { map } from '../map';

describe('map', () => {
  const times = [100, 100, 100, 100, 100, 500];

  it('should be able to map all without providing concurrency', async () => {
    const beforeDate = Date.now();

    const r = await map(
      times,
      async (time) =>
        await new Promise<number>((resolve) => {
          setTimeout(() => {
            return resolve(time);
          }, time);
        }),
    );

    const afterDate = Date.now();

    const timeRun = afterDate - beforeDate;
    expect(timeRun).toBeGreaterThan(times[times.length - 1] - 100);
    expect(timeRun).toBeLessThan(times[times.length - 1] + 100);

    expect(r).toEqual(times);
  });

  it('should be able to map concurrently', async () => {
    const beforeDate = Date.now();

    const r = await map(
      times,
      async (time) =>
        await new Promise<number>((resolve) => {
          setTimeout(() => {
            return resolve(time);
          }, time);
        }),
      2,
    );

    const afterDate = Date.now();

    const timeRun = afterDate - beforeDate;

    expect(timeRun).toBeGreaterThan(600);
    expect(timeRun).toBeLessThan(800);

    expect(r).toEqual(times);
  });

  it('should do nothing if empty array provided', async () => {
    const beforeDate = Date.now();

    const r = await map(
      [],
      async (time) =>
        await new Promise<number>((resolve) => {
          setTimeout(() => {
            return resolve(time);
          }, time);
        }),
      2,
    );

    const afterDate = Date.now();

    const timeRun = afterDate - beforeDate;

    expect(timeRun).toBeLessThan(100);

    expect(r).toEqual([]);
  });
});
