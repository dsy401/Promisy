import { delay } from '../delay';

describe('delay', () => {
  it('should be able to delay', async () => {
    const beforeDate = Date.now();

    const value = await delay(1000, 'value');

    const afterDate = Date.now();

    const timeRun = afterDate - beforeDate;
    expect(timeRun).toBeGreaterThan(900);
    expect(timeRun).toBeLessThan(1100);

    expect(value).toEqual('value');
  });
});
