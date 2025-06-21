import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {EntryOrExitLayoutType} from 'react-native-reanimated';

export interface IProps {
  index?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  entering?: EntryOrExitLayoutType | undefined;
}
