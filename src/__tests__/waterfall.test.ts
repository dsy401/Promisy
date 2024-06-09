import { waterfall } from '../waterfall';

describe('waterfall', () => {
  it('should be able to waterfall', async () => {
    const f1 = (num: number) => Promise.resolve(num);
    const f2 = (num: number) => Promise.resolve(num.toString());

    const f3 = (str: string) => Promise.resolve(!!str);

    const waterfallFn = waterfall(f1, f2, f3);

    const r = await waterfallFn(100);

    expect(r).toEqual(true);
  });
});
