import React from 'react';
import {Text, StyleProp, TextProps, TextStyle} from 'react-native';
import {config, FONT_FAMILY} from '@/theme/config';
import {colors} from '@/theme/colors';

export interface ThemedTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  size?: keyof typeof config.fonts;
  weight?: keyof typeof FONT_FAMILY;
  color?: keyof typeof colors;
  disabled?: boolean;
}

const ThemedText = ({children, ...props}: ThemedTextProps & TextStyle) => {
  const {
    size = 'fs_16',
    weight = 'Roboto_regular',
    color: colorKey,
    disabled,
    style: styleOverride,
    ...rest
  } = props;

  return (
    <Text
      style={[
        config.fonts[size] as TextStyle,
        {
          fontFamily: FONT_FAMILY[weight],
          color: disabled
            ? colors.darkGray
            : colorKey
            ? colors[colorKey]
            : colors.white,
          ...rest,
        },
        styleOverride,
      ]}>
      {children}
    </Text>
  );
};

export default ThemedText;
