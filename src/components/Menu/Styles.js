import { StyleSheet } from 'react-native';
import { textColor } from '../../styles/CommonStyles';

export default StyleSheet.create({
  menuHolder: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  menuItem: {
    color: textColor,
    fontFamily: 'Merriweather-Light',
    fontSize: 15,
    marginBottom: 8
  }
});
