import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TrailerMovieService} from '../services/trailer-movie.service';

@Component({
    selector: 'app-detail-page',
    templateUrl: './detail-page.page.html',
    styleUrls: ['./detail-page.page.scss'],
})
export class DetailPagePage implements OnInit {

    public data: any;
    genreArray: Array<string> = [];
    trailersData: any;
    splitArray: [];
    FavIcon = 'heart-empty';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public trailerService: TrailerMovieService
    ) {
        this.route.queryParams.subscribe(params => {
            if (params && params.movie) {
                this.data = JSON.parse(params.movie);
                console.log(this.data);
                this.splitArray = this.data.genres.split(',');
                for (var i = 0; i < this.splitArray.length; i++) {
                    this.genreArray.push(this.splitArray[i]);
                }
                this.getTrailerMovie();
            }
        });
    }

    openTrailer() {

    }

    ngOnInit() {
    }

    async getTrailerMovie() {
        this.trailerService.getTrailers(this.data.id).subscribe(response => {
            this.trailersData = response.results;
            console.log(response.results);
        });
    }
}
