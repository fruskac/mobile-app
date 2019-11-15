import { height } from '../../utils/Screen';
import { backgroundColor } from '../../styles/CommonStyles';
import { width as ScreenWidth } from '../../utils/Screen';

export const Styles = {
  holder: {
    position: 'absolute',
    left: 0,
    zIndex: 40,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: backgroundColor,
    height: height,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f8f3'
  },
  img: {
    width: '100%',
    height: '100%'
  },
  bottomText: {
    marginBottom: height * 0.12
  },
  sponsorLogo: {
    width: ScreenWidth / 3,
    height: ScreenWidth / 3,
    resizeMode: 'contain',
    padding: 21,
    paddingTop: 0,
    zIndex: 10, 
    position: 'absolute',
    bottom: 12
  }
};