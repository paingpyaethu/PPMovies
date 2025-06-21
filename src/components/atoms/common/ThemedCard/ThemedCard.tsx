import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import {colors, config} from '@/theme';

type ThemedCardProps = {
  children: React.ReactNode;
  cardContainerStyle?: StyleProp<ViewStyle>;
} & TouchableOpacityProps;

type ViewGroupType =
  | React.ComponentType<ViewStyle>
  | React.ComponentType<TouchableOpacityProps>;

const ThemedCard = ({
  children,
  cardContainerStyle,
  ...props
}: ThemedCardProps) => {
  const ViewGroup: ViewGroupType = props.onPress ? TouchableOpacity : View;
  return (
    <ViewGroup
      activeOpacity={0.8}
      style={[styles.cardContainerStyle, cardContainerStyle]}
      {...props}>
      {children}
    </ViewGroup>
  );
};
export default ThemedCard;

const styles = StyleSheet.create({
  cardContainerStyle: {
    backgroundColor: colors.secondary,
    borderRadius: config.spacing[10],
    ...config.shadows.light,
  },
});
