import { connect } from 'react-redux';
import Menu from './Menu';
import { onChangeLanguage } from '../../store/actions/settings';
import { onNavigate } from '../../store/actions/navigation';
import { bindActionCreators } from 'redux';
import { getBigAd } from '../../selectors/settings';

const mapDispatchToProps = dispatch => bindActionCreators({ onChangeLanguage, onNavigate }, dispatch);
const mapStateToProps = state => ({ 
    language: state.settings.language,
    big_ad: getBigAd(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
