import * as connect from '../connect';
import * as userActions from '../../../actions/user';

jest.mock('../../../actions/user', () => ({
  login: jest.fn(arg => arg),
}));

const mockDispatch = 'dispatch';

describe('Test connect for <Login>', () => {
  it('mapDispatchToProps should call login with mockDispatch', () => {
    connect.mapDispatchToProps(mockDispatch);
    expect(userActions.login).toBeCalledWith(mockDispatch);
  });

  it('mapDispatchToProps should return proper object with result of calling login', () => {
    expect(connect.mapDispatchToProps(mockDispatch)).toEqual({ login: mockDispatch });
  });
});
