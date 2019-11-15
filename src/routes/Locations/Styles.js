import { StyleSheet } from 'react-native';
import {
  textColor,
  borderBottomColor,
  borderColor
} from '../../styles/CommonStyles';

export const menuHeight = 40;

export default StyleSheet.create({
  topMenu: {
    width: '100%',
    height: menuHeight,
    flexDirection: 'row'
  },
  topMenuItem: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: borderBottomColor,
    borderBottomWidth: 2
  },
  menuItem: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: borderBottomColor,
    borderBottomWidth: 1
  },
  withRightBorder: {
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  scrollView: {
    flex: 1
  },
  menu: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  textPlacesList: {
    color: textColor,
    fontFamily: 'Merriweather-Light',
    fontSize: 12,
    lineHeight: 21,
    padding: 9,
    paddingTop: 0
  },
  textTitle: {
    marginTop: 6,
  }
});
