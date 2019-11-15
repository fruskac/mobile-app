import { Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

export const width = dimensions.width;
export const widthDrawer = Math.round(dimensions.width * 0.7);
export const height = dimensions.height;
export const fontScale = dimensions.fontScale;
