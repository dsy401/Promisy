import { reduce } from '../reduce';

describe('reduce', () => {
  it('should be able reduce', async () => {
    const numArr = [1, 2, 3, 4, 5];

    const sum = await reduce(
      numArr,
      async (acc, num) => {
        const resolvedNum = await new Promise<number>((resolve) => {
          setTimeout(() => {
            return resolve(num);
          }, 100);
        });

        return resolvedNum + acc;
      },
      0,
    );

    expect(sum).toEqual(numArr.reduce((acc, num) => acc + num, 0));
  });

  it('should return default accumulator if empty array provided', async () => {
    const r = await reduce([], async () => 0, 10);

    expect(r).toEqual(10);
  });
});
