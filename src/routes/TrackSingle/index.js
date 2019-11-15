import { connect } from 'react-redux';
import TrackSingle from './TrackSingle';
import { getLanguage } from '../../selectors/settings';
import { getTrackSingle } from '../../selectors/locations';
import { onNavigate } from '../../store/actions/navigation';

const mapDispatchToProps = { onNavigate };
const mapStateToProps = (state, ownProps) => {
  return {
    language: getLanguage(state),
    data: getTrackSingle(state, ownProps),
    id: ownProps.navigation.state.params.id,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSingle);
