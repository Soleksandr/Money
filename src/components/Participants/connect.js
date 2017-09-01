import { connect } from 'react-redux';
import * as participantsActions from '../../actions/participants';

export const mapStateToProps = state => ({
  participants: state.participants,
});

export const mapDispatchToProps = dispatch => ({
  getParticipants: participantsActions.getParticipants(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
