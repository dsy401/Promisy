import { mapBatch } from '../mapBatch';

describe('mapBatch', () => {
  it('should be able to map batch', async () => {
    const times = [101, 102, 103, 104, 105, 106, 107, 108];

    const beforeDate = Date.now();

    const timeBatch = await mapBatch(
      times,
      async (t) => {
        return new Promise<number>((resolve) => {
          setTimeout(() => {
            return resolve(t);
          }, t);
        });
      },
      3,
    );

    const afterDate = Date.now();
    const timeRun = afterDate - beforeDate;

    const expectedTimeRun = times[2] + times[5] + times[times.length - 1];

    const bias = 15;

    expect(timeRun).toBeGreaterThan(expectedTimeRun - bias);
    expect(timeRun).toBeLessThan(expectedTimeRun + bias);

    expect(timeBatch).toEqual([
      [101, 102, 103],
      [104, 105, 106],
      [107, 108],
    ]);
  });
});
