import reducer from '../../reducers/user';
import * as types from '../../constants/';

const mockUser = {
  name: 'Evgeny',
  surname: 'Onegin',
};

const actionCretor = (p, t) => ({
  payload: p,
  type: t,
});

describe('user reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null', () => {
    const action = actionCretor(null, {});
    expect(reducer(undefined, action)).toEqual(null);
  });

  it('should handle USER_INITIALIZE', () => {
    const action = actionCretor(mockUser, types.USER_INITIALIZE);
    expect(reducer(null, action))
      .toEqual(mockUser);
  });

  it('should handle LOG_IN', () => {
    const action = actionCretor(mockUser, types.LOG_IN);
    expect(reducer(null, action))
      .toEqual(mockUser);
  });

  it('should handle LOG_OUT', () => {
    const action = actionCretor(null, types.LOG_OUT);
    expect(reducer(mockUser, action))
      .toEqual(null);
  });
});
