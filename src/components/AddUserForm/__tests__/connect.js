import * as connect from '../connect';
import * as usersActions from '../../../actions/users';

jest.mock('../../../actions/users', () => ({
  addUser: jest.fn(arg => arg),
}));

const mockDispatch = 'dispatch';

describe('Test connect for <AddUserForm>', () => {
  it('mapDispatchToProps should call addUser with mockDispatch', () => {
    connect.mapDispatchToProps(mockDispatch);
    expect(usersActions.addUser).toBeCalledWith(mockDispatch);
  });

  it('mapDispatchToProps should return proper object with result of calling addUser', () => {
    expect(connect.mapDispatchToProps(mockDispatch)).toEqual({ addUser: mockDispatch });
  });
});
