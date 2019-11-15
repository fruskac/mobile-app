import { connect } from 'react-redux';
import SpashWithAds from './SplashScreen';
import { onFetchConfig } from '../../store/actions/ads';
import { getSponsorLogo } from '../../selectors/settings';

const mapDispatchToProps = { onFetchConfig };
const mapStateToProps = state => ({
  sponsor_logo: getSponsorLogo(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(SpashWithAds);