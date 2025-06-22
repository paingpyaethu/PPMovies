import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ThemedCard from '@/components/atoms/common/ThemedCard/ThemedCard';
import {Text, TouchableOpacity} from 'react-native';

jest.mock('@/theme', () => ({
  colors: {
    secondary: '#333333',
  },
  config: {
    spacing: {10: 10},
    shadows: {light: {shadowColor: '#000'}},
  },
}));

describe('ThemedCard', () => {
  it('renders children correctly', () => {
    const {getByText} = render(
      <ThemedCard>
        <Text>{'Card Content'}</Text>
      </ThemedCard>,
    );
    expect(getByText('Card Content')).toBeTruthy();
  });

  it('renders with View if onPress is not provided', () => {
    const {UNSAFE_getByType} = render(
      <ThemedCard>{<>Static Card</>}</ThemedCard>,
    );
    expect(() => UNSAFE_getByType(TouchableOpacity)).toThrow();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <ThemedCard onPress={onPressMock} testID="pressable-card">
        <>{'Press Me'}</>
      </ThemedCard>,
    );

    fireEvent.press(getByTestId('pressable-card'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
