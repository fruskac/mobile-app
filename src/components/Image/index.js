import { connect } from 'react-redux';
import Image from './Image';

const mapDispatchToProps = { };
const mapStateToProps = state => ({ hasInternet: state.cache.hasInternet });

export default connect(mapStateToProps, mapDispatchToProps)(Image);
