import React, {useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import {Movie} from '@/features/movies/types';
import UpcomingMoviesCard from '@/components/molecules/UpcomingMoviesCard';
import {ThemedText} from '../atoms';
import {config} from '@/theme';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store';
import {ActivityIndicator, View} from 'react-native';

interface UpcomingMovieListProps {
  data: Movie[];
  favorites: number[];
}

const UpcomingMovieList = ({data, favorites}: UpcomingMovieListProps) => {
  const dispatch = useDispatch();
  const {page, hasNextPage, scrollLoading} = useSelector(
    (state: RootState) => state.movies,
  );

  const onEndReached = () => {
    if (hasNextPage.upcoming) {
      dispatch({type: 'movies/loadNextUpcomingPage', payload: page.upcoming});
    }
  };
  const renderItem = useCallback(
    ({item}: {item: Movie}) => (
      <UpcomingMoviesCard
        movie={item}
        isFavorite={favorites.includes(item.id)}
      />
    ),
    [favorites],
  );

  const renderFooter = (type: 'upcoming' | 'popular') => {
    if (!scrollLoading[type]) return null;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator />
      </View>
    );
  };

  return (
    <>
      <ThemedText
        weight="Roboto_bold"
        size="fs_30"
        marginBottom={config.spacing[16]}>
        Upcoming
      </ThemedText>
      <FlashList
        data={data}
        extraData={[]}
        horizontal
        estimatedItemSize={135} // 142
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => renderFooter('upcoming')}
        showsHorizontalScrollIndicator={false}
        getItemType={item => {
          return item.id;
        }}
      />
    </>
  );
};

export default UpcomingMovieList;
