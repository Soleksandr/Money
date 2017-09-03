import reducer from '../../reducers/participants';
import * as types from '../../constants/';

const mockParticipants = [
  {
    name: 'Ivan',
    surname: 'Ivanov',
    id: 1,
  },
  {
    name: 'Petr',
    surname: 'Petrov',
    id: 2,
  },
];

const actionCretor = (p, t) => ({
  payload: p,
  type: t,
});

describe('participants reducer', () => {
  it('should return empty array', () => {
    const action = actionCretor(null, {});
    expect(reducer(undefined, action)).toEqual([]);
  });

  it('should handle GET_PARTICIPANTS', () => {
    const action = actionCretor(mockParticipants, types.GET_PARTICIPANTS);
    expect(reducer(undefined, action))
      .toEqual(mockParticipants);
  });
});
