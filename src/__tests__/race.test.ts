import { race } from '../race';

describe('race', () => {
  it('should return rabbit instead of turtle', async () => {
    const rabbit = new Promise<string>((resolve) => {
      setTimeout(() => {
        return resolve('rabbit');
      }, 500);
    });

    const turtle = new Promise<string>((resolve) => {
      setTimeout(() => {
        return resolve('turtle');
      }, 1000);
    });

    const r = await race([rabbit, turtle]);

    expect(r).toEqual('rabbit');
  });
});
