import reducer, {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  setUpcomingPage,
  setPopularPage,
  appendMovies,
  setScrollLoading,
  toggleFavorite,
  toggleFavoriteBulk,
} from '@/features/movies/movieSlice';

const dummyMovie = (id: number) => ({id, title: `Movie ${id}`} as any);

const initialState = {
  upcoming: [],
  popular: [],
  favorites: [],
  loading: true,
  error: null,
  page: {upcoming: 1, popular: 1},
  hasNextPage: {upcoming: true, popular: true},
  scrollLoading: {upcoming: false, popular: false},
};

describe('movieSlice', () => {
  it('should handle fetchMoviesRequest', () => {
    const nextState = reducer(initialState, fetchMoviesRequest());
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle fetchMoviesSuccess', () => {
    const movies = [dummyMovie(1), dummyMovie(2)];
    const nextState = reducer(
      initialState,
      fetchMoviesSuccess({upcoming: movies, popular: movies}),
    );
    expect(nextState.loading).toBe(false);
    expect(nextState.upcoming).toHaveLength(2);
    expect(nextState.popular).toHaveLength(2);
  });

  it('should handle fetchMoviesFailure', () => {
    const nextState = reducer(
      initialState,
      fetchMoviesFailure('error occurred'),
    );
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('error occurred');
  });

  it('should update upcoming page', () => {
    const nextState = reducer(initialState, setUpcomingPage(3));
    expect(nextState.page.upcoming).toBe(3);
  });

  it('should update popular page', () => {
    const nextState = reducer(initialState, setPopularPage(5));
    expect(nextState.page.popular).toBe(5);
  });

  it('should append upcoming movies and set hasNextPage', () => {
    const nextState = reducer(
      initialState,
      appendMovies({
        type: 'upcoming',
        results: [dummyMovie(1)],
        hasNextPage: false,
      }),
    );
    expect(nextState.upcoming).toHaveLength(1);
    expect(nextState.hasNextPage.upcoming).toBe(false);
  });

  it('should append popular movies and set hasNextPage', () => {
    const nextState = reducer(
      initialState,
      appendMovies({
        type: 'popular',
        results: [dummyMovie(2)],
        hasNextPage: true,
      }),
    );
    expect(nextState.popular).toHaveLength(1);
    expect(nextState.hasNextPage.popular).toBe(true);
  });

  it('should set scroll loading per type', () => {
    const state1 = reducer(
      initialState,
      setScrollLoading({type: 'upcoming', loading: true}),
    );
    expect(state1.scrollLoading.upcoming).toBe(true);

    const state2 = reducer(
      state1,
      setScrollLoading({type: 'popular', loading: true}),
    );
    expect(state2.scrollLoading.popular).toBe(true);
  });

  it('should toggle favorite correctly', () => {
    let state = reducer(initialState, toggleFavorite(1));
    expect(state.favorites).toContain(1);
    state = reducer(state, toggleFavorite(1));
    expect(state.favorites).not.toContain(1);
  });

  it('should bulk set favorites', () => {
    const state = reducer(initialState, toggleFavoriteBulk([1, 2, 3]));
    expect(state.favorites).toEqual([1, 2, 3]);
  });
});
