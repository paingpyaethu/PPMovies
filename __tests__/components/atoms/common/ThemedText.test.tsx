import React from 'react';
import {render} from '@testing-library/react-native';
import {colors} from '@/theme/colors';
import {FONT_FAMILY} from '@/theme/config';
import ThemedText from '@/components/atoms/common/ThemedText/ThemedText';

jest.mock('@/theme/config', () => ({
  config: {
    fonts: {
      fs_16: {fontSize: 16},
      fs_20: {fontSize: 20},
    },
  },
  FONT_FAMILY: {
    Roboto_regular: 'Roboto-Regular',
    Roboto_bold: 'Roboto-Bold',
  },
}));

jest.mock('@/theme/colors', () => ({
  colors: {
    white: '#FFFFFF',
    darkGray: '#999999',
    primary: '#FF0000',
  },
}));

describe('ThemedText', () => {
  it('renders children correctly', () => {
    const {getByText} = render(<ThemedText>Test Text</ThemedText>);
    expect(getByText('Test Text')).toBeTruthy();
  });

  it('applies default font size and color', () => {
    const {getByText} = render(<ThemedText>Default Style</ThemedText>);
    const text = getByText('Default Style');
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        {fontSize: 16},
        expect.objectContaining({
          fontFamily: FONT_FAMILY.Roboto_regular,
          color: colors.white,
        }),
      ]),
    );
  });

  it('applies custom size, weight, and color', () => {
    const {getByText} = render(
      <ThemedText size="fs_20" weight="Roboto_bold" color="primary">
        Custom Style
      </ThemedText>,
    );
    const text = getByText('Custom Style');
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        {fontSize: 20},
        expect.objectContaining({
          fontFamily: FONT_FAMILY.Roboto_bold,
          color: colors.primary,
        }),
      ]),
    );
  });

  it('applies disabled color when disabled', () => {
    const {getByText} = render(<ThemedText disabled>Disabled Text</ThemedText>);
    const text = getByText('Disabled Text');
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({color: colors.darkGray}),
      ]),
    );
  });
});
