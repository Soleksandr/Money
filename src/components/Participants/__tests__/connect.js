import * as connect from '../connect';
import * as participantsActions from '../../../actions/participants';

jest.mock('../../../actions/participants', () => ({
  getParticipants: jest.fn(arg => arg),
}));

const mockUser1 = {
  username: 'ivan',
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

const mockUser2 = {
  username: 'petr',
  name: 'Petr',
  surname: 'Petrov',
  id: 2,
};

const mockState = {
  participants: [
    mockUser1,
    mockUser2,
  ],
};

const mockDispatch = 'dispatch';

describe('Test connect for <Participants>', () => {
  it('mapStateToProps should return proper object with data from mockState', () => {
    expect(connect.mapStateToProps(mockState)).toEqual({
      participants: mockState.participants,
    });
  });

  it('mapDispatchToProps should call getParticipants with mockDispatch', () => {
    connect.mapDispatchToProps(mockDispatch);
    expect(participantsActions.getParticipants).toBeCalledWith(mockDispatch);
  });

  it('mapDispatchToProps should return proper object with result of calling getParticipants', () => {
    expect(connect.mapDispatchToProps(mockDispatch)).toEqual({
      getParticipants: mockDispatch,
    });
  });
});
