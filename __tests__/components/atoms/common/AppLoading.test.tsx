import React from 'react';
import {render} from '@testing-library/react-native';
import AppLoading from '@/components/atoms/common/AppLoading/AppLoading';

jest.mock('@/components/template', () => ({
  SafeScreen: ({children}: {children: React.ReactNode}) => <>{children}</>,
}));

jest.mock('@/theme', () => ({
  colors: {
    lightGray: '#cccccc',
  },
}));

describe('AppLoading', () => {
  it('renders ActivityIndicator with correct color and size', () => {
    const {getByTestId} = render(<AppLoading />);
    const indicator = getByTestId('activity-indicator');

    expect(indicator.props.color).toBe('#cccccc');
    expect(indicator.props.size).toBe('large');
  });
});
