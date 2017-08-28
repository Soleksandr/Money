import * as connect from '../connect';

const mockState = {
  transactions: [
    {
      title: 'test',
      cost: 1,
      payerId: 1,
      participantsId: [1, 2],
      id: 1,
    },
  ],
};

describe('Test connect for <Transactions>', () => {
  it('mapStateToProps should return proper object with data from mockState', () => {
    expect(connect.mapStateToProps(mockState)).toEqual({
      transactions: mockState.transactions,
    });
  });
});
