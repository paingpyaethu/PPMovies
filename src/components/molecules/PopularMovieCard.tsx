import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Movie} from '@/features/movies/types';
import {ThemedCard, ThemedText} from '../atoms';
import {config} from '@/theme';
import FastImage from '@d11/react-native-fast-image';

interface PopularMovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onPress?: () => void;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

const PopularMovieCard = ({
  movie,
  isFavorite,
  onToggleFavorite,
  onPress,
}: PopularMovieCardProps) => {
  return (
    <ThemedCard
      onPress={onPress}
      cardContainerStyle={{marginBottom: config.spacing[16]}}>
      <FastImage
        source={{uri: `${IMAGE_BASE_URL}${movie.poster_path}`}}
        style={styles.poster}
        resizeMode={FastImage.resizeMode.cover}
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

export default PopularMovieCard;

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
