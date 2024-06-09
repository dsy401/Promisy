import { tap } from '../tap';

describe('tap', () => {
  it('should be able to tap', async () => {
    const fnMock = jest.fn();

    const r = await Promise.resolve('hello').then(tap((value) => fnMock(value)));

    expect(r).toEqual('hello');

    expect(fnMock).toHaveBeenCalledTimes(1);
    expect(fnMock).toHaveBeenCalledWith('hello');
  });
});
