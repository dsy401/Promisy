import { debounce } from '../debounce';

describe('debounce', () => {
  const mockFn = jest.fn();

  it('should be able to debounce', async () => {
    const fn = debounce(
      async () =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            mockFn();
            return resolve();
          }, 500);
        }),
      500,
    );

    fn();
    await fn();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
