import { connect } from 'react-redux';
import LocationSingle from './LocationSingle';
import { getLanguage } from '../../selectors/settings';
import { getLocationSingle } from '../../selectors/locations';
import { onNavigate } from '../../store/actions/navigation';

const mapDispatchToProps = { onNavigate };
const mapStateToProps = (state, ownProps) => {
  return {
    language: getLanguage(state),
    data: getLocationSingle(state, ownProps)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSingle);
