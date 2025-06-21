import React, {useEffect} from 'react';
import {View, FlatList, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store';
import {fetchMoviesRequest, toggleFavorite} from '@/features/movies/movieSlice';
import {SafeScreen} from '@/components/template';
import {ThemedText} from '@/components/atoms';
import {config} from '@/theme';
import {useNavigation} from '@react-navigation/native';
import UpcomingMovies from '@/components/molecules/UpcomingMovies';
import {Movie} from '@/features/movies/types';
import PopularMovieCard from '@/components/molecules/PopularMovieCard';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {upcoming, popular, favorites, loading, error} = useSelector(
    (state: RootState) => state.movies,
  );

  useEffect(() => {
    dispatch(fetchMoviesRequest());
  }, [dispatch]);

  const renderUpcomingMovie = ({item}: {item: Movie}) => (
    <UpcomingMovies
      movie={item}
      isFavorite={favorites.includes(item.id)}
      onToggleFavorite={id => dispatch(toggleFavorite(id))}
      onPress={() => navigation.navigate('Detail', {movieId: item.id})}
    />
  );

  const renderMovie = ({item}: {item: Movie}) => (
    <PopularMovieCard
      movie={item}
      isFavorite={favorites.includes(item.id)}
      onToggleFavorite={id => dispatch(toggleFavorite(id))}
      onPress={() => navigation.navigate('Detail', {movieId: item.id})}
    />
  );

  return (
    <SafeScreen containerStyle={{flex: 1, padding: config.spacing[16]}}>
      {loading && <ThemedText>Loading...</ThemedText>}
      {error && (
        <View>
          <ThemedText>Error: {error}</ThemedText>
          <Button
            title="Retry"
            onPress={() => dispatch(fetchMoviesRequest())}
          />
        </View>
      )}
      {!loading && !error && (
        <View style={{flex: 1, paddingTop: config.spacing[16]}}>
          <ThemedText
            weight="Roboto_bold"
            size="fs_30"
            marginBottom={config.spacing[16]}>
            Upcoming
          </ThemedText>
          <FlatList
            data={upcoming}
            horizontal
            renderItem={renderUpcomingMovie}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: config.spacing[16]}}
          />

          <ThemedText
            weight="Roboto_bold"
            size="fs_30"
            marginVertical={config.spacing[16]}>
            Popular
          </ThemedText>
          <FlatList
            data={popular}
            renderItem={renderMovie}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{paddingBottom: config.spacing[20]}}
          />
        </View>
      )}
    </SafeScreen>
  );
};

export default HomeScreen;
