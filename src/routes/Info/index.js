import { connect } from 'react-redux';
import Info from './Info';
import { getLanguage } from '../../selectors/settings';
import { getInfos } from '../../selectors/locations';
import { onNavigate } from '../../store/actions/navigation';
import { onFetchInfos } from '../../store/actions/info';

const mapDispatchToProps = { onNavigate, onFetchInfos };
const mapStateToProps = (state, ownProps) => ({
  language: getLanguage(state),
  infos: getInfos(state, ownProps)
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);
