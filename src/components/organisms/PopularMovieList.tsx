import React, {useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import {Movie} from '@/features/movies/types';
import PopularMovieCard from '@/components/molecules/PopularMovieCard';
import {ThemedText} from '../atoms';
import {config} from '@/theme';

interface PopularMovieListProps {
  data: Movie[];
  favorites: number[];
}

const PopularMovieList = ({data, favorites}: PopularMovieListProps) => {
  const renderItem = useCallback(
    ({item}: {item: Movie}) => (
      <PopularMovieCard movie={item} isFavorite={favorites.includes(item.id)} />
    ),
    [favorites],
  );
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
        estimatedItemSize={400} // 266
        renderItem={renderItem}
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
