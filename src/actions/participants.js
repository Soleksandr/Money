import * as constants from '../constants';
import * as participantsApiCalls from '../apiCalls/participants';

export const getParticipants = dispatch => data =>
  participantsApiCalls.getParticipants(data).then(participants =>
    dispatch({
      type: constants.GET_PARTICIPANTS,
      payload: participants,
    }));
