import {MovieService} from '@/services/MovieService';

describe('MovieService interface structure', () => {
  const mockService: MovieService = {
    fetchUpcoming: jest.fn(
      async (_page?: number) => [{id: 1, title: 'Test Movie'}] as any,
    ),
    fetchPopular: jest.fn(
      async (_page?: number) => [{id: 2, title: 'Popular Movie'}] as any,
    ),
  };

  it('should define fetchUpcoming method', async () => {
    const movies = await mockService.fetchUpcoming(1);
    expect(mockService.fetchUpcoming).toHaveBeenCalledWith(1);
    expect(movies).toEqual([{id: 1, title: 'Test Movie'}]);
  });

  it('should define fetchPopular method', async () => {
    const movies = await mockService.fetchPopular(2);
    expect(mockService.fetchPopular).toHaveBeenCalledWith(2);
    expect(movies).toEqual([{id: 2, title: 'Popular Movie'}]);
  });
});
