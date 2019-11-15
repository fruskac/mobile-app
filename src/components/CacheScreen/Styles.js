import { StyleSheet } from 'react-native';
import * as Screen from '../../utils/Screen';
import { backgroundColor } from '../../styles/CommonStyles';
import { width as ScreenWidth } from '../../utils/Screen';


export default StyleSheet.create({
  holder: {
    position: 'absolute',
    left: 0,
    zIndex: 40,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: backgroundColor,
    height: Screen.height,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topText: {
    marginTop: Screen.height * 0.17
  },
  loader: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20
  },
  progressText: {
    marginTop: 40,
    fontSize: 20
  },
  bottomText: {
    marginBottom: Screen.height * 0.12
  },
  reloadButton: {
    padding: 15,
  },
  reloadButtonText: {
    fontSize: 18,
  },
  sponsorLogo: {
    width: ScreenWidth / 3,
    height: ScreenWidth / 3,
    resizeMode: 'contain',
    padding: 21,
    paddingTop: 0
  }
});
