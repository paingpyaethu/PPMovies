import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Movie} from '@/features/movies/types';
import {ThemedCard, ThemedText} from '../atoms';
import {config} from '@/theme';

interface UpcomingMoviesProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onPress?: () => void;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

const UpcomingMovies = ({
  movie,
  isFavorite,
  onToggleFavorite,
  onPress,
}: UpcomingMoviesProps) => {
  return (
    <ThemedCard onPress={onPress} cardContainerStyle={styles.container}>
      <Image
        source={{uri: `${IMAGE_BASE_URL}${movie.poster_path}`}}
        style={styles.poster}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: config.spacing[8],
          right: config.spacing[8],
        }}
        onPress={() => onToggleFavorite(movie.id)}>
        <ThemedText size="fs_24">{isFavorite ? '❤️' : '🤍'}</ThemedText>
      </TouchableOpacity>
    </ThemedCard>
  );
};

export default UpcomingMovies;

const styles = StyleSheet.create({
  container: {
    width: config.spacing[140],
    marginRight: 12,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: config.spacing[300],
    borderRadius: config.spacing[8],
  },
  heart: {
    fontSize: 20,
    marginTop: 8,
  },
});
