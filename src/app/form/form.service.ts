import { Injectable } from '@angular/core';
import {map, Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IMovie } from "../interfaces/movie.interface";
import {IMovieItemRaw, IMovieResponseRaw} from "../interfaces/movie-raw.interface";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  public getMoviesFromAPI(value: string): Observable<IMovie[]> {
    return this.http.get<IMovieResponseRaw>(`https://www.omdbapi.com/?apikey=83513884&type=movie&s=${value}`)
      .pipe(
        map((res: IMovieResponseRaw) => {
          return res?.Search?.reduce((acc: IMovie[], curr: IMovieItemRaw) => {
            const movie = {
              posterImageURL: curr.Poster,
              title: curr.Title,
              prodYear: curr.Year
            };
            acc.push(movie);
            return acc;
          }, []);
        })
      );
  }
}
