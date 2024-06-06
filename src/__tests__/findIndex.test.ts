import { findIndex } from '../findIndex';

describe('findIndex', () => {
  const users = [
    {
      id: '1',
      name: 'Oliver',
    },
    {
      id: '2',
      name: 'Bob',
    },
    {
      id: '3',
      name: 'Lucas',
    },
  ];

  const userActive = [
    {
      id: '1',
      active: true,
    },
    {
      id: '2',
      active: true,
    },
    {
      id: '3',
      active: true,
    },
  ];

  const findUserActiveByUserId = (userId: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      return resolve(userActive.find(({ id }) => id === userId)?.active ?? false);
    });
  };

  it('should be able to return -1 if provided array is empty', async () => {
    const r = await findIndex([], () => true);

    expect(r).toEqual(-1);
  });

  it('should be able to find active user index', async () => {
    const index = await findIndex(users, async ({ id }) => findUserActiveByUserId(id));

    expect(index).toEqual(0);
  });

  it('should be able to return -1 when finding the inactive user', async () => {
    const index = await findIndex(users, async ({ id }) => !(await findUserActiveByUserId(id)));

    expect(index).toEqual(-1);
  });
});
