import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {Movie} from '@/features/movies/types';
import UpcomingMoviesCard from '@/components/molecules/UpcomingMoviesCard';
import {ThemedText} from '../atoms';
import {config} from '@/theme';

interface UpcomingMovieListProps {
  data: Movie[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onPress: (id: number) => void;
}

const UpcomingMovieList = ({
  data,
  favorites,
  onToggleFavorite,
  onPress,
}: UpcomingMovieListProps) => {
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
        horizontal
        estimatedItemSize={100}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <UpcomingMoviesCard
            movie={item}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={onToggleFavorite}
            onPress={() => onPress(item.id)}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default UpcomingMovieList;
