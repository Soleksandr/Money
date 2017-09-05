import * as constants from '../constants';
import { fetchQuery } from '../apiCalls/graphql';

export const getParticipants = dispatch => () =>
  fetchQuery(constants.QUERY_PARTICIPANTS).then((result) => {
    const participants = result.data.getParticipants;
    dispatch({
      type: constants.GET_PARTICIPANTS,
      payload: participants,
    });
  });
