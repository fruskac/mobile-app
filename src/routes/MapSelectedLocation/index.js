import { connect } from 'react-redux';
import MapSelectedLocation from './MapSelectedLocation';
import { getLanguage } from '../../selectors/settings';
import { onNavigate } from '../../store/actions/navigation';
import { getLocationsForMap } from '../../selectors/locations';
import { onFetchMap } from '../../store/actions/locations';

const mapDispatchToProps = {onNavigate, getLocationsForMap, onFetchMap};
const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.navigation.state.params.id,
    language: getLanguage(state),
    locationsForMap: state.locations['map_'+getLanguage(state)],
    tags: state.locations['tags_'+getLanguage(state)],
    hasInternet: state.cache.hasInternet,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapSelectedLocation);
