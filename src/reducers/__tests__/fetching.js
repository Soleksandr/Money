import reducer from '../../reducers/fetching';
import * as types from '../../constants/';

const actionCretor = (p, t) => ({
  payload: p,
  type: t,
});

describe('fetching reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return false', () => {
    const action = actionCretor(undefined, {});
    expect(reducer(undefined, action)).toEqual(false);
  });

  it('should handle FETHCING_DATA', () => {
    const action = actionCretor(true, types.FETHCING_DATA);
    expect(reducer(null, action)).toEqual(action.payload);
  });
});
