import { getStatusBarHeight } from 'react-native-safearea-height';
import { Platform } from 'react-native';

/**
 * statusBar 높이 반환
 * @returns 높이 반환
 */
export const statusBarHeight = () => {
  if (Platform.OS === 'android') {
    return 30;
  }

  return getStatusBarHeight(true);
};
