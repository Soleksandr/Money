import * as connect from '../connect';

const mockState = {
  users: [
    {
      name: 'Ivan',
      surname: 'Ivanov',
      id: 1,
    },
  ],
};

describe('Test connect for <Transaction>', () => {
  it('mapStateToProps should return proper object with data from mockState', () => {
    expect(connect.mapStateToProps(mockState)).toEqual({ users: mockState.users });
  });
});
