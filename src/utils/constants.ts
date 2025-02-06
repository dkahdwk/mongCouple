import { isIphoneX } from 'react-native-iphone-screen-helper';
import { Dimensions } from 'react-native';

export const deviceScreen = Dimensions.get('screen');

export const platformPaddingBottom = isIphoneX() ? 35 : 30;
