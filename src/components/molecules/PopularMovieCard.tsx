import React, {memo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Movie} from '@/features/movies/types';
import {FastImageWithLoader, ThemedCard, ThemedText} from '../atoms';
import {config} from '@/theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {toggleFavorite} from '@/features/movies/movieSlice';

interface PopularMovieCardProps {
  movie: Movie;
  isFavorite: boolean;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

const PopularMovieCard = ({movie, isFavorite}: PopularMovieCardProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };
  return (
    <ThemedCard
      onPress={() => navigation.navigate('Detail', {movieId: movie.id})}
      cardContainerStyle={{marginBottom: config.spacing[16]}}>
      <FastImageWithLoader
        source={{uri: `${IMAGE_BASE_URL}${movie.poster_path}`}}
        style={styles.poster}
      />
      <View style={styles.info}>
        <ThemedText size="fs_18" numberOfLines={1}>
          {movie.title}
        </ThemedText>
        <ThemedText color="lightGray" size="fs_14">
          {movie.release_date}
        </ThemedText>
        <ThemedText opacity={0.8} size="fs_14">
          Vote: {movie.vote_average}
        </ThemedText>
      </View>
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

export default memo(PopularMovieCard);

const styles = StyleSheet.create({
  poster: {
    width: '100%',
    height: config.spacing[200],
    borderRadius: config.spacing[8],
  },
  info: {
    margin: config.spacing[10],
  },
});
