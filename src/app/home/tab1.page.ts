import {Component, OnInit} from '@angular/core';
import {RecentMoviesService} from '../services/recent-movies.service';
import {GenreService} from '../services/genre-service.service';
import {PopularMoviesService} from '../services/popular-movies.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    moviesData: any;
    popularMoviesData: any;
    moviesDataF: any;
    popularMoviesDataF: any;
    genresData: any;
    slideOpts = {
        initialSlide: 1,
        speed: 400,
        slidesPerView: 1.3
    };

    constructor(
        public recentService: RecentMoviesService,
        public genreService: GenreService,
        private router: Router,
        public popularService: PopularMoviesService
    ) {
        this.moviesData = [];
        this.popularMoviesData = [];
        this.genresData = [];
        this.moviesDataF = [];
        this.popularMoviesDataF = [];
    }

    ngOnInit() {
        this.getGenres();
    }

    async getRecentMovies() {
        this.recentService.getMovies().subscribe(response => {
            this.moviesData = response.results;
            for (let i = 0; i < this.moviesData.length; i++) {
                this.moviesData[i].poster_path = 'http://image.tmdb.org/t/p/w500' + this.moviesData[i].poster_path;
                this.moviesData[i].backdrop_path = 'http://image.tmdb.org/t/p/w500' + this.moviesData[i].backdrop_path;
                let genres = '';
                for (let j = 0; j < this.moviesData[i].genre_ids.length; j++) {
                    const index = this.genresData.findIndex(x => x.id === this.moviesData[i].genre_ids[j]);
                    if (index !== -1) {
                        genres += this.genresData[index].name + ', ';
                    }
                }
                genres = genres.substring(0, genres.length - 2);
                this.moviesData[i].genres = genres;
            }
            console.log(response.results);
            for (var i = 0; i < 4; i++)
            this.moviesDataF.push(this.moviesData[i]);
            this.getPopularMovies();
        });
    }

    openDetail(movie: any) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                movie: JSON.stringify(movie)
            }
        };
        this.router.navigate(['detail-page'], navigationExtras);
    }

    async getPopularMovies() {
        this.popularService.getPopuMovies().subscribe(response => {
            this.popularMoviesData = response.results;
            for (let i = 0; i < this.popularMoviesData.length; i++) {
                this.popularMoviesData[i].poster_path = 'http://image.tmdb.org/t/p/w500' + this.popularMoviesData[i].poster_path;
                this.popularMoviesData[i].backdrop_path = 'http://image.tmdb.org/t/p/w500' + this.popularMoviesData[i].backdrop_path;
                let genres = '';
                for (let j = 0; j < this.popularMoviesData[i].genre_ids.length; j++) {
                    const index = this.genresData.findIndex(x => x.id === this.popularMoviesData[i].genre_ids[j]);
                    if (index !== -1) {
                        genres += this.genresData[index].name + ', ';
                    }
                }
                genres = genres.substring(0, genres.length - 2);
                this.popularMoviesData[i].genres = genres;
            }
            for (var i = 0; i < 4; i++)
            this.popularMoviesDataF.push(this.popularMoviesData[i]);
            console.log(response.results);
        });
    }

    async getGenres() {
        this.genreService.getGenres().subscribe(response => {
            this.genresData = response.genres;
            console.log(response.genres);
            this.getRecentMovies();
        });
    }

}
