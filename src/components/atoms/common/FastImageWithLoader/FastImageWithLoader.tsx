import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import FastImage, {FastImageProps} from '@d11/react-native-fast-image';
import {colors} from '@/theme';

interface FastImageWithLoaderProps extends FastImageProps {
  loaderSize?: number | 'small' | 'large';
  loaderColor?: string;
}

const FastImageWithLoader = ({
  style,
  loaderSize = 'small',
  loaderColor = colors.lightGray,
  ...props
}: FastImageWithLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={[style, styles.wrapper]}>
      <FastImage
        {...props}
        style={StyleSheet.absoluteFill}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator
            testID="ActivityIndicator"
            size={loaderSize}
            color={loaderColor}
          />
        </View>
      )}
    </View>
  );
};

export default FastImageWithLoader;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  loader: {
    position: 'absolute',
  },
});
