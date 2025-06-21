import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store';
import {fetchMoviesRequest} from '@/features/movies/movieSlice';
import {SafeScreen} from '@/components/template';
import {AppLoading, ThemedText} from '@/components/atoms';
import {config} from '@/theme';
import PopularMovieList from '@/components/organisms/PopularMovieList';
import UpcomingMovieList from '@/components/organisms/UpcomingMovieList';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {upcoming, popular, favorites, loading, error} = useSelector(
    (state: RootState) => state.movies,
  );

  useEffect(() => {
    dispatch(fetchMoviesRequest());
  }, [dispatch]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <SafeScreen containerStyle={{flex: 1, padding: config.spacing[16]}}>
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
          <UpcomingMovieList data={upcoming} favorites={favorites} />
          <PopularMovieList data={popular} favorites={favorites} />
        </View>
      )}
    </SafeScreen>
  );
};

export default HomeScreen;
