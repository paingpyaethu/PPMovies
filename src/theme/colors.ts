import {ColorSchemeName} from 'react-native';

export const colors = {
  primary: '#222831',
  secondary: '#393E46',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#948979',
  lightGray: '#DFD0B8',
  darkGray: '#505050',
  background: '#222831',
};

export type Palette = (typeof colors)[keyof typeof colors];

export type Theme = ColorSchemeName | keyof typeof colors;
