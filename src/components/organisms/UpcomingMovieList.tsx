import React, {useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import {Movie} from '@/features/movies/types';
import UpcomingMoviesCard from '@/components/molecules/UpcomingMoviesCard';
import {ThemedText} from '../atoms';
import {config} from '@/theme';

interface UpcomingMovieListProps {
  data: Movie[];
  favorites: number[];
}

const UpcomingMovieList = ({data, favorites}: UpcomingMovieListProps) => {
  const renderItem = useCallback(
    ({item}: {item: Movie}) => (
      <UpcomingMoviesCard
        movie={item}
        isFavorite={favorites.includes(item.id)}
      />
    ),
    [favorites],
  );

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
        estimatedItemSize={142}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        getItemType={item => {
          return item.id;
        }}
      />
    </>
  );
};

export default UpcomingMovieList;
