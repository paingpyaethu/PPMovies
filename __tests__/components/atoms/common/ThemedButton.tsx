import React from 'react';
import {Text} from 'react-native';
import {render, fireEvent} from '@testing-library/react-native';
import ThemedButton from '@/components/atoms/common/ThemedButton/ThemedButton';

jest.mock('@/theme/config', () => ({
  config: {
    spacing: {
      8: 8,
      20: 20,
      45: 45,
    },
  },
}));

jest.mock('@/theme', () => ({
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    white: '#ffffff',
    black: '#000000',
  },
}));

describe('ThemedButton', () => {
  it('renders children correctly when not loading', () => {
    const {getByText} = render(
      <ThemedButton onPress={() => {}}>
        <Text>Click Me</Text>
      </ThemedButton>,
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('shows ActivityIndicator when loading', () => {
    const {getByTestId, queryByText} = render(
      <ThemedButton loading onPress={() => {}}>
        <Text>Submit</Text>
      </ThemedButton>,
    );
    expect(getByTestId('activityIndicator')).toBeTruthy();
    expect(queryByText('Submit')).toBeNull();
  });

  it('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const {getByText} = render(
      <ThemedButton onPress={mockPress}>
        <Text>Tap</Text>
      </ThemedButton>,
    );
    fireEvent.press(getByText('Tap'));
    expect(mockPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const mockPress = jest.fn();
    const {getByText} = render(
      <ThemedButton onPress={mockPress} disabled>
        <Text>Disabled</Text>
      </ThemedButton>,
    );
    fireEvent.press(getByText('Disabled'));
    expect(mockPress).not.toHaveBeenCalled();
  });
});
