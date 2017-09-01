import * as actions from '../participants';
import * as apiCalls from '../../apiCalls/participants';
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

jest.mock('../../apiCalls/participants', () => ({
  getParticipants: jest.fn(() => Promise.resolve(mockParticipants)),
}));

describe('Test participants actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getParticipants should calls apiCalls.getParticipants', () => {
    actions.getParticipants(mockDispatch)();
    expect(apiCalls.getParticipants).toBeCalled();
  });

  it('getParticipants should calls mockDispatch with proper arguments', () => {
    actions.getParticipants(mockDispatch)()
      .then(() => expect(mockDispatch).toBeCalledWith({
        type: constants.GET_PARTICIPANTS,
        payload: mockParticipants,
      }));
  });
});
