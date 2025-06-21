import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {config} from '@/theme/config';
import {colors} from '@/theme';

type ThemedButtonType = 'primary' | 'secondary' | 'transparent';

interface ThemedButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: ThemedButtonType;
  style?: ViewStyle;
  children: React.ReactNode;
}

const ThemedButton = ({
  onPress,
  loading = false,
  disabled = false,
  type = 'secondary',
  style,
  children,
}: ThemedButtonProps) => {
  const buttonStyles: Record<string, object> = {
    primary: {
      backgroundColor: colors.primary,
    } as ViewStyle,
    secondary: {
      backgroundColor: colors.secondary,
    } as ViewStyle,
    transparent: {
      backgroundColor: 'transparent',
    } as ViewStyle,
  };

  const getLoaderColor = () => {
    switch (type) {
      case 'secondary':
        return colors.white;
      case 'primary':
        return colors.white;
      default:
        return colors.black;
    }
  };

  return (
    <Pressable
      style={[
        styles.button,
        buttonStyles[disabled || loading ? 'disabled' : type],
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator
          testID="activityIndicator"
          color={getLoaderColor()}
        />
      ) : (
        children
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: config.spacing[45],
    paddingHorizontal: config.spacing[20],
    borderRadius: config.spacing[8],
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ThemedButton;
