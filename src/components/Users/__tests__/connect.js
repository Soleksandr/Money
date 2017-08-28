import * as connect from '../connect';

const mockState = {
  users: [
    {
      username: 'ivan',
      name: 'Ivan',
      surname: 'Ivanon',
      id: 1,
    },
  ],
  transactions: [
    {
      id: 1,
      title: 'test1',
      cost: '50',
      payerId: 1,
      participantsId: [1, 2],
    },
  ],
  user:
  {
    username: 'ivan',
    name: 'Ivan',
    surname: 'Ivanov',
    id: 1,
  },
};

describe('Test connect for <Transaction>', () => {
  it('mapStateToProps should return proper object with data from mockState', () => {
    expect(connect.mapStateToProps(mockState)).toEqual({
      users: mockState.users,
      transactions: mockState.transactions,
      user: mockState.user,
    });
  });
});
