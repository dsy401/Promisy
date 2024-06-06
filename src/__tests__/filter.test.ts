import { filter } from '../filter';

describe('filter', () => {
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
      active: false,
    },
  ];

  const findUserActiveByUserId = (userId: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      return resolve(userActive.find(({ id }) => id === userId)?.active ?? false);
    });
  };

  it('should be able to return empty array if provided item is empty', async () => {
    const r = await filter([], () => true);

    expect(r).toEqual([]);
  });

  it('should be able to filter by active user', async () => {
    const activeUsers = await filter(users, async ({ id }) => await findUserActiveByUserId(id));

    expect(activeUsers).toEqual(users.slice(0, 2));
  });
});
