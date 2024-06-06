import { throttle } from '../throttle';

describe('throttle', () => {
  const throttledFn = throttle(
    async (time: number) =>
      new Promise<number>((resolve) => {
        setTimeout(() => {
          return resolve(time);
        }, time);
      }),
    200,
  );

  it('should not be able to throttle', async () => {
    const result = await throttledFn(100);

    expect(result).toEqual(100);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        return resolve();
      }, 1000);
    });
  });

  it('should be able to throttle', (done) => {
    throttledFn(100).then((r) => {
      expect(r).toEqual(100);
    });

    throttledFn(100).catch((error) => {
      expect(error).toEqual(new Error(`The function has been throttled within 200 milliseconds`));
      done();
    });
  });
});
