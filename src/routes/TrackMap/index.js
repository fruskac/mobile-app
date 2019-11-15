import { connect } from 'react-redux';
import TrackMap from './TrackMap';
import { getLanguage } from '../../selectors/settings';
import { onNavigate } from '../../store/actions/navigation';
import { getTrackSingle, getLocationsForMap } from '../../selectors/locations';
import { onFetchMap } from '../../store/actions/locations';

const mapDispatchToProps = {onNavigate, getLocationsForMap, onFetchMap};
const mapStateToProps = (state, ownProps) => {
  return {
    language: getLanguage(state),
    trackData: getTrackSingle(state, ownProps),
    id: ownProps.navigation.state.params.id,
    locationsForMap: state.locations['map_'+getLanguage(state)],
    hasInternet: state.cache.hasInternet,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackMap);
