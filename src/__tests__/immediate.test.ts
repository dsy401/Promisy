import { immediate } from '../immediate';

describe('immediate', () => {
  it('should be able to immediate', async () => {
    const beforeDate = Date.now();

    const value = await immediate('value');

    const afterDate = Date.now();

    const timeRun = afterDate - beforeDate;
    expect(timeRun).toBeLessThan(100);

    expect(value).toEqual('value');
  });
});
