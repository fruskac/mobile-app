import { connect } from 'react-redux';
import HeaderAd from './HeaderAd';
import { onOpenAd, onNavigate } from '../../store/actions/navigation';
import { getSmallAd } from '../../selectors/settings';

const mapDispatchToProps = {
  onOpenAd,
  onNavigate
};
const mapStateToProps = state => ({ 
  language: state.settings.language,
  small_ad: getSmallAd(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAd);