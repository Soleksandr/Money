import * as actions from '../participants';
import { fetchQuery } from '../../apiCalls/graphql';
import * as constants from '../../constants';

const mockDispatch = jest.fn();

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

jest.mock('../../apiCalls/graphql', () => ({
  fetchQuery: jest.fn(() => Promise.resolve({ data: { getParticipants: mockParticipants } })),
}));

describe('Test participants actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getParticipants should calls fetchQuery with proper arguments', () => {
    actions.getParticipants(mockDispatch)();
    expect(fetchQuery).toBeCalledWith(constants.QUERY_PARTICIPANTS);
  });

  it('getParticipants should calls mockDispatch with proper arguments', () => {
    actions.getParticipants(mockDispatch)()
      .then(() => expect(mockDispatch).toBeCalledWith({
        type: constants.GET_PARTICIPANTS,
        payload: mockParticipants,
      }));
  });
});
