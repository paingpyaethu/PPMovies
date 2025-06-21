import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store';
import {SafeScreen} from '@/components/template';
import {FastImageWithLoader, ThemedText} from '@/components/atoms';
import {toggleFavorite} from '@/features/movies/movieSlice';
import {Movie} from '@/features/movies/types';
import {config} from '@/theme';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const DetailScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {movieId} = route.params as {movieId: number};

  const {upcoming, popular, favorites} = useSelector(
    (state: RootState) => state.movies,
  );

  const movie: Movie | undefined = [...upcoming, ...popular].find(
    m => m.id === movieId,
  );

  if (!movie) {
    return (
      <SafeScreen>
        <ThemedText size="fs_20">Movie not found</ThemedText>
      </SafeScreen>
    );
  }

  const isFavorite = favorites.includes(movie.id);
  const onToggleFavorite = () => dispatch(toggleFavorite(movie.id));

  return (
    <SafeScreen containerStyle={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FastImageWithLoader
          source={{uri: `${IMAGE_BASE_URL}${movie.poster_path}`}}
          style={styles.poster}
        />

        <View style={styles.info}>
          <View style={styles.headerRow}>
            <ThemedText weight="Roboto_bold" size="fs_28">
              {movie.title}
            </ThemedText>

            <TouchableOpacity onPress={onToggleFavorite}>
              <ThemedText size="fs_30">{isFavorite ? '❤️' : '🤍'}</ThemedText>
            </TouchableOpacity>
          </View>

          <ThemedText
            size="fs_16"
            opacity={0.8}
            marginVertical={config.spacing[8]}>
            Release Date: {movie.release_date}
          </ThemedText>

          <ThemedText size="fs_16" marginBottom={config.spacing[8]}>
            Rating: {movie.vote_average}/10
          </ThemedText>

          <ThemedText size="fs_16">{movie.overview}</ThemedText>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: config.spacing[16],
  },
  poster: {
    width: '100%',
    height: config.spacing[400],
    borderRadius: config.spacing[12],
    marginTop: config.spacing[16],
  },
  info: {
    marginTop: config.spacing[20],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
