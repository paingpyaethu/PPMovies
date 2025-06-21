import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {Movie} from '@/features/movies/types';
import PopularMovieCard from '@/components/molecules/PopularMovieCard';
import {ThemedText} from '../atoms';
import {config} from '@/theme';

interface PopularMovieListProps {
  data: Movie[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onPress: (id: number) => void;
}

const PopularMovieList = ({
  data,
  favorites,
  onToggleFavorite,
  onPress,
}: PopularMovieListProps) => {
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
        estimatedItemSize={140}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <PopularMovieCard
            movie={item}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={onToggleFavorite}
            onPress={() => onPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default PopularMovieList;
