import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  currentPosition: {
    top: 100
  },
  filtersContainer: {
    position: 'absolute',
    width: '75%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingTop: 9,
    paddingBottom: 12,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'space-between',
    top: 100,
    right: 0,
    // bottom: 140,
    zIndex: 20,
    backgroundColor: '#fff',
    // marginBottom: 20
  },
  filters: {
    width: '50%',
    height: 36
  },
  checkBoxText: {
    fontSize: 12,
    padding: 0,
    margin: 0
  },
  checkBoxContainer: {
    padding: 0,
    margin: 0,
    borderWidth: 0,
    backgroundColor: '#fff'
  }
});
