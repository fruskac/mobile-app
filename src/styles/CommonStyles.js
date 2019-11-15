import { StyleSheet, Platform } from 'react-native';

export const fontSizeHeader = Platform.OS === 'ios' ? 18 : 16;
export const backgroundColor = '#F6F7F1';
export const defaultMargin = 20;
export const navHeaderHeight = 54;
export const headerAdHeight = 40;
export const textColor = '#454546';
export const tintColor = '#0066ff';
export const accentColor = '#D51A5E';
export const borderColor = '#E2E3DE';
export const borderBottomColor = '#E0E1DC';
export const bgColorHeaderAd = '#d0d0d0';

export default StyleSheet.create({
  viewMargin: {
    margin: defaultMargin
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: backgroundColor
  },
  textTitle: {
    color: textColor,
    fontFamily: 'Merriweather-Light',
    fontSize: 21,
    paddingBottom: 18
  },
  text: {
    color: textColor,
    fontFamily: 'Merriweather-Light',
    fontSize: 12,
    lineHeight: 21,
    paddingTop: 0
  },
  textTabs: {
    color: textColor,
    fontFamily: 'Merriweather-Light',
    fontSize: 15,
    lineHeight: 21,
    paddingTop: 0
  },
  onMapBtn: {
    position: 'absolute',
    backgroundColor: backgroundColor,
    padding: 8,
    alignItems: 'center',
    top: 54,
    right: 0,
    width: 48,
    zIndex: 12,
    borderWidth: 0,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 2,
    elevation: 1,
  },
  onMapBtnTxt: {
    position: 'absolute',
    backgroundColor: backgroundColor,
    padding: 2,
    top: 102,
    alignItems: 'center',
    right: 0,
    width: 48,
    zIndex: 12,
    borderWidth: 0,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 2,
    elevation: 1,
  },
  errorText: {
    backgroundColor: 'red',
    color: 'white',
    padding: 4,
    fontSize: 16
  },
  // Map
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  annotationContainerMini: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  selectedMarker: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 3,
    borderColor: '#FF6659',
    zIndex: 1000
  },
  annotationPopupContainer: {
    width: 210, 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    borderWidth: 1.2, 
    borderColor: '#333', 
    overflow: 'hidden'
  },
  annotationPopupImage: { width: 210, height: 160 },
  annotationPopupText: {textAlign: 'center', fontSize: 15, padding: 3, paddingBottom: 9, margin: 9},
  annotationPopupButton: {padding: 3, borderWidth: 1.5, backgroundColor: '#558B2F', borderRadius: 12, margin: 9},
  annotationPopupButtonText: {color: '#fff', textAlign: 'center'},
  newsPadding: {padding: 12, paddingTop: 0, marginBottom: 12}
});
