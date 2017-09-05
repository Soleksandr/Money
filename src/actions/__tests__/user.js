import * as actions from '../user';
import * as userApiCalls from '../../apiCalls/user';
import * as constants from '../../constants';

const mockDispatch = jest.fn();

const mockUser = {
  id: 1,
  name: 'Evgeny',
  surname: 'Onegin',
};

jest.mock('../../apiCalls/user', () => ({
  userInitialize: jest.fn(() => Promise.resolve(mockUser)),
  login: jest.fn(data => Promise.resolve(data)),
  logout: jest.fn(() => Promise.resolve(null)),
}));

describe('Test user actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('userInitialize should calls userApiCalls.userInitialize', () => {
    actions.userInitialize(mockDispatch)();
    expect(userApiCalls.userInitialize).toBeCalled();
  });

  it('userInitialize should calls mockDispatch three times', () => {
    actions.userInitialize(mockDispatch)()
      .then(() => expect(mockDispatch).toHaveBeenCalledTimes(3));
  });

  it('userInitialize should calls mockDispatch with proper arguments', () => {
    actions.userInitialize(mockDispatch)()
      .then(() => {
        expect(mockDispatch).toBeCalledWith({
          type: constants.FETHCING_DATA,
          payload: true,
        });
        expect(mockDispatch).toBeCalledWith({
          type: constants.FETHCING_DATA,
          payload: false,
        });
        expect(mockDispatch).toBeCalledWith({
          type: constants.USER_INITIALIZE,
          payload: mockUser,
        });
      });
  });

  it('login should calls userApiCalls.login with proper argument', () => {
    actions.login(mockDispatch)(mockUser);
    expect(userApiCalls.login).toBeCalledWith(mockUser);
  });

  it('login should calls mockDispatch with proper arguments', () => {
    actions.login(mockDispatch)(mockUser)
      .then(() => {
        expect(mockDispatch).toBeCalledWith({
          type: constants.LOG_IN,
          payload: mockUser,
        });
      });
  });

  it('logout should calls userApiCalls.logout', () => {
    actions.logout(mockDispatch)(mockUser);
    expect(userApiCalls.logout).toBeCalled();
  });

  it('logout should calls mockDispatch three times', () => {
    actions.logout(mockDispatch)(mockUser)
    .then(() => expect(mockDispatch).toHaveBeenCalledTimes(3));
  });

  it('logout should calls mockDispatch with proper arguments', () => {
    actions.logout(mockDispatch)()
      .then(() => {
        expect(mockDispatch).toBeCalledWith({
          type: constants.LOG_OUT,
          payload: null,
        });
        expect(mockDispatch).toBeCalledWith({
          type: constants.GET_TRANSACTIONS,
          payload: [],
        });
        expect(mockDispatch).toBeCalledWith({
          type: constants.GET_PARTICIPANTS,
          payload: [],
        });
      });
  });
});
