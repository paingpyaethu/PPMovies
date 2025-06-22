import React, {useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import {Movie} from '@/features/movies/types';
import PopularMovieCard from '@/components/molecules/PopularMovieCard';
import {ThemedText} from '../atoms';
import {config} from '@/theme';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store';
import {ActivityIndicator} from 'react-native';

interface PopularMovieListProps {
  data: Movie[];
  favorites: number[];
}

const PopularMovieList = ({data, favorites}: PopularMovieListProps) => {
  const dispatch = useDispatch();
  const {page, hasNextPage, scrollLoading} = useSelector(
    (state: RootState) => state.movies,
  );

  const onEndReachedPopular = () => {
    if (hasNextPage.popular) {
      dispatch({type: 'movies/loadNextPopularPage', payload: page.popular});
    }
  };

  const renderItem = useCallback(
    ({item}: {item: Movie}) => (
      <PopularMovieCard movie={item} isFavorite={favorites.includes(item.id)} />
    ),
    [favorites],
  );

  const renderFooter = (type: 'upcoming' | 'popular') => {
    if (!scrollLoading[type]) return null;
    return <ActivityIndicator style={{padding: config.spacing[18]}} />;
  };

  return (
    <>
      <ThemedText
        weight="Roboto_bold"
        size="fs_30"
        marginVertical={config.spacing[16]}>
        Popular
      </ThemedText>
      <FlashList
        data={data}
        extraData={[]}
        estimatedItemSize={290}
        renderItem={renderItem}
        onEndReached={onEndReachedPopular}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => renderFooter('popular')}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: config.spacing[20]}}
        getItemType={item => {
          return item.id;
        }}
      />
    </>
  );
};

export default PopularMovieList;
