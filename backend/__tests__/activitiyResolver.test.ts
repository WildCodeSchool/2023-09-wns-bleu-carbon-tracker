import { execute } from '../jest.setup';
import ActivityEntry from '../src/entities/activity-entry/activity-entry';
import Category from '../src/entities/category/category';
import getNewUser from './helpers/getNewUser';
import getActivitiesQuery from './operations/getActivities';
import generateAuthToken from './helpers/getAuthTokenTest';

describe('Activity entry resolver', () => {
  it('can get a list of activities', async () => {
    const newUser = await getNewUser();

    const authToken = await generateAuthToken(newUser);

    await Category.create({
      id: 1,
      name: 'cat1',
      createdAt: new Date(),
    }).save();

    await ActivityEntry.create({
      name: 'title1',
      input: 10,
      spendedAt: new Date('2024-07-22T07:43:28.593Z'),
      user: newUser,
      category: { id: 1 },
    }).save();

    await ActivityEntry.create({
      name: 'title2',
      input: 20,
      spendedAt: new Date('2024-07-22T07:43:28.593Z'),
      user: newUser,
      category: { id: 1 },
    }).save();
    const res = await execute(getActivitiesQuery, null, authToken);

    expect(res).toMatchSnapshot();
  });
});
