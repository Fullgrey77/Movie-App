import { TestBed } from '@angular/core/testing';

import { RecentMoviesService } from './recent-movies.service';

describe('RecentMoviesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecentMoviesService = TestBed.get(RecentMoviesService);
    expect(service).toBeTruthy();
  });
});
