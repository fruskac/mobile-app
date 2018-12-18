// import React from 'react';
// import SvgIcon from 'react-native-svg-icon';
// import svgs from '../../assets/icons/svgs';

// const Icon = (props) => <SvgIcon {...props} svgs={svgs} />;

// export default Icon;

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../fontSelection.json';

export default Icon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'fonts.ttf');