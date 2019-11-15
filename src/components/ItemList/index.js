import { connect } from 'react-redux';
import ItemList from './ItemList';
import { getLanguage } from '../../selectors/settings';
import { onNavigate } from '../../store/actions/navigation';

const mapDispatchToProps = { onNavigate };
const mapStateToProps = state => ({ language: getLanguage(state), hasInternet: state.cache.hasInternet });

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
