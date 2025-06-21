import {scaledSize} from '@/theme';
import {Platform} from 'react-native';

const scaled = (value: number) => {
  return {
    height: scaledSize(value),
    width: scaledSize(value),
  };
};

const platformOS = Platform.OS;
const isIOS = platformOS === 'ios';
const isAndroid = platformOS === 'android';

export {scaled, isAndroid, isIOS};
