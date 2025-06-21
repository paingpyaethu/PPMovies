import {TextStyle} from 'react-native';
import {moderateScale, scaledSize} from '@/theme/metrics';

export enum FONT_FAMILY {
  Roboto_regular = 'Roboto-Regular',
  Roboto_medium = 'Roboto-Medium',
  Roboto_semibold = 'Roboto-SemiBold',
  Roboto_bold = 'Roboto-Bold',
}

const metricSizes = {
  '1': moderateScale(1),
  '1.5': moderateScale(1.5),
  '2': scaledSize(2),
  '3': scaledSize(3),
  '4': scaledSize(4),
  '6': scaledSize(6),
  '7': scaledSize(7),
  '8': scaledSize(8),
  '10': scaledSize(10),
  '11': scaledSize(11),
  '12': scaledSize(12),
  '14': scaledSize(14),
  '16': scaledSize(16),
  '18': scaledSize(18),
  '20': scaledSize(20),
  '22': scaledSize(22),
  '24': scaledSize(24),
  '26': scaledSize(26),
  '28': scaledSize(28),
  '30': scaledSize(30),
  '32': scaledSize(32),
  '34': scaledSize(34),
  '35': scaledSize(35),
  '40': scaledSize(40),
  '45': scaledSize(45),
  '50': scaledSize(50),
  '60': scaledSize(60),
  '80': scaledSize(80),
  '100': scaledSize(100),
  '110': scaledSize(110),
  '120': scaledSize(120),
  '130': scaledSize(130),
  '140': scaledSize(140),
  '150': scaledSize(150),
  '160': scaledSize(160),
  '180': scaledSize(180),
  '200': scaledSize(200),
  '220': scaledSize(220),
  '240': scaledSize(240),
};

const shadows = {
  extraLight: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  light: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  normal: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  dark: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
};

const themeFontStyles = {
  fs_10: {
    fontSize: metricSizes[10],
    lineHeight: metricSizes[18],
  } as TextStyle,
  fs_11: {
    fontSize: metricSizes[11],
    lineHeight: metricSizes[16],
  } as TextStyle,
  fs_12: {
    fontSize: metricSizes[12],
    lineHeight: metricSizes[22],
  } as TextStyle,
  fs_14: {
    fontSize: metricSizes[14],
    lineHeight: metricSizes[24],
  } as TextStyle,
  fs_16: {
    fontSize: metricSizes[16],
    lineHeight: metricSizes[24],
  } as TextStyle,
  fs_18: {
    fontSize: metricSizes[18],
    lineHeight: metricSizes[26],
  } as TextStyle,
  fs_20: {
    fontSize: metricSizes[20],
    lineHeight: metricSizes[28],
  } as TextStyle,
  fs_24: {
    fontSize: metricSizes[24],
    lineHeight: metricSizes[30],
  } as TextStyle,
  fs_28: {
    fontSize: metricSizes[28],
    lineHeight: metricSizes[32],
  } as TextStyle,
  fs_30: {
    fontSize: metricSizes[30],
    lineHeight: metricSizes[34],
  } as TextStyle,
};

export const config = {
  shadows,
  spacing: metricSizes,
  fonts: themeFontStyles,
};
