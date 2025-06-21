import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Movie} from '@/features/movies/types';
import {FastImageWithLoader, ThemedCard, ThemedText} from '../atoms';
import {config} from '@/theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {toggleFavorite} from '@/features/movies/movieSlice';

interface UpcomingMoviesProps {
  movie: Movie;
  isFavorite: boolean;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

const UpcomingMoviesCard = ({movie, isFavorite}: UpcomingMoviesProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <ThemedCard
      onPress={() => navigation.navigate('Detail', {movieId: movie.id})}
      cardContainerStyle={styles.container}>
      <FastImageWithLoader
        source={{uri: `${IMAGE_BASE_URL}${movie.poster_path}`}}
        style={styles.poster}
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

export default memo(UpcomingMoviesCard);

const styles = StyleSheet.create({
  container: {
    width: config.spacing[140],
    marginRight: config.spacing[12],
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: config.spacing[240],
    borderRadius: config.spacing[8],
  },
});
