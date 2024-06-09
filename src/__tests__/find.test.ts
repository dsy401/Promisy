import { find } from '../find';

describe('find', () => {
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

  it('should be able to return null if provided array is empty', async () => {
    const r = await find([], () => true);

    expect(r).toEqual(null);
  });

  it('should be able to find active user', async () => {
    const activeUser = await find(users, async ({ id }) => findUserActiveByUserId(id));

    expect(activeUser).toEqual(users[0]);
  });

  it('should be able to find inactive user', async () => {
    const inactiveUser = await find(users, async ({ id }) => !(await findUserActiveByUserId(id)));

    expect(inactiveUser).toBeNull();
  });
});
