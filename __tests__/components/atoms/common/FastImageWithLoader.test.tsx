import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import FastImageWithLoader from '@/components/atoms/common/FastImageWithLoader/FastImageWithLoader';
import {Source} from '@d11/react-native-fast-image';

jest.mock('@d11/react-native-fast-image', () => {
  const RealComponent = jest.requireActual('react-native').Image;
  return {
    __esModule: true,
    default: RealComponent,
  };
});

jest.mock('@/theme', () => ({
  colors: {
    lightGray: '#ccc',
  },
}));

describe('FastImageWithLoader', () => {
  it('displays loader initially and hides after load', async () => {
    const {getByTestId, queryByTestId} = render(
      <FastImageWithLoader
        testID="test-image"
        source={{uri: 'https://image.com'}}
      />,
    );

    expect(getByTestId('ActivityIndicator')).toBeTruthy();

    fireEvent(getByTestId('test-image'), 'onLoad');

    await waitFor(() => {
      expect(queryByTestId('ActivityIndicator')).toBeNull();
    });
  });

  it('uses default loader color and size', () => {
    const {getByTestId} = render(
      <FastImageWithLoader
        testID="test-image"
        source={{uri: 'https://image.com'} as Source}
      />,
    );

    const loader = getByTestId('ActivityIndicator');
    expect(loader.props.color).toBe('#ccc');
    expect(loader.props.size).toBe('small');
  });
});
