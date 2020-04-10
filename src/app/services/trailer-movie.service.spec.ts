import { TestBed } from '@angular/core/testing';

import { TrailerMovieService } from './trailer-movie.service';

describe('TrailerMovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrailerMovieService = TestBed.get(TrailerMovieService);
    expect(service).toBeTruthy();
  });
});
