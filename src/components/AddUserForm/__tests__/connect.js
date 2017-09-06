import * as connect from '../connect';
import * as usersActions from '../../../actions/users';

jest.mock('../../../actions/users', () => ({
  createUser: jest.fn(arg => arg),
}));

const mockDispatch = 'dispatch';

describe('Test connect for <AddUserForm>', () => {
  it('mapDispatchToProps should call createUser with mockDispatch', () => {
    connect.mapDispatchToProps(mockDispatch);
    expect(usersActions.createUser).toBeCalledWith(mockDispatch);
  });

  it('mapDispatchToProps should return proper object with result of calling createUser', () => {
    expect(connect.mapDispatchToProps(mockDispatch)).toEqual({ createUser: mockDispatch });
  });
});
