import { settleAll } from '../settleAll';

describe('settleAll', () => {
  it('should be able to settle all', async () => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.reject(new Error('Something went wrong'));
    const p3 = Promise.resolve('test');

    const r = await settleAll([p1, p2, p3]);

    expect(r).toEqual([
      {
        status: 'fulfilled',
        value: 1,
      },
      {
        status: 'rejected',
        reason: new Error('Something went wrong'),
      },
      {
        status: 'fulfilled',
        value: 'test',
      },
    ]);
  });
});
