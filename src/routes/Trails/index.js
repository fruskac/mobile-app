import { connect } from 'react-redux';
import Trails from './Trails';
import { onNavigate } from '../../store/actions/navigation';
import { getTracks } from '../../selectors/locations';
import { onFetchTracks } from '../../store/actions/tracks';

const mapDispatchToProps = {onNavigate, onFetchTracks};

const mapStateToProps = (state, ownProps) => {
  return {
    language: state.settings.language,
    tracks: getTracks(state, ownProps),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trails);