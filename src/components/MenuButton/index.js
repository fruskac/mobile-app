import { connect } from 'react-redux';
import MenuButton from './MenuButton';
import { onToggleDrawer } from '../../store/actions/settings';

const mapDispatchToProps = { onToggleDrawer };
const mapStateToProps = state => ({ drawerOpen: state.settings.drawerOpen });

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);
