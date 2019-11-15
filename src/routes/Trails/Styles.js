import { StyleSheet } from 'react-native';
import { borderBottomColor } from '../../styles/CommonStyles';

export const menuHeight = 40;
export const easyColor = '#808900';
export const mediumColor = '#FCB900';
export const hardColor = '#B80000';
export const menuItemBorderSize = 1;
export const topMenuItemBorderSize = 1;

export default StyleSheet.create({
  topMenu: {
    width: '100%',
    height: menuHeight,
    flexDirection: 'row',
  },
  topMenuItem: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: borderBottomColor,
    borderBottomWidth: topMenuItemBorderSize,
  },
  menu: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItem: {
    padding: 12,
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#dadada',
    borderBottomWidth: menuItemBorderSize,
  },
  borderRightWidth: {borderRightWidth: menuItemBorderSize},
  circlesBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    backgroundColor: 'red',
    margin: 9,
  },
  colorEasy: {
    backgroundColor: easyColor,
  },
  colorMedium: {
    backgroundColor: mediumColor,
  },
  colorHard: {
    backgroundColor: hardColor,
  },
  menuItemText: {
    textAlign: 'center',
    fontFamily: 'Merriweather-Light',
    fontSize: 15,
    lineHeight: 21,
  },
  trailsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
