import {SafeScreen} from '@/components/template';
import {colors} from '@/theme';
import React from 'react';
import {ActivityIndicator} from 'react-native';

const AppLoading = () => {
  return (
    <SafeScreen
      containerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator
        testID="activity-indicator"
        color={colors.lightGray}
        size={'large'}
      />
    </SafeScreen>
  );
};

export default AppLoading;
