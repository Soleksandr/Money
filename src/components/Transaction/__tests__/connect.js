import * as connect from '../connect';

const mockUser1 = {
  username: 'ivan',
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

const mockUser2 = {
  username: 'petr',
  name: 'Petr',
  surname: 'Petrov',
  id: 2,
};

const mockState = {
  transactions: [
    {
      title: 'test1',
      cost: '1',
      payer: mockUser1,
      participants: [mockUser1, mockUser2],
      id: 1,
    },
    {
      title: 'test2',
      cost: '2',
      payer: mockUser2,
      participants: [mockUser1, mockUser2],
      id: 2,
    },
  ],
};

describe('Test connect for <Transaction>', () => {
  it('mapStateToProps should return proper object with data from mockState', () => {
    expect(connect.mapStateToProps(mockState)).toEqual({
      transactions: mockState.transactions,
    });
  });
});
