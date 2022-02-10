import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import { ISport } from '../interfaces/sport';
import { TokenStorageService } from './token-storage.service';
const getAllSportsUrl: string =
  'http://devmeta.multifeedcenter.com/Sport/all?includeSources=false';
@Injectable({
  providedIn: 'root',
})
export class SportService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {}
  private selectedSportSubject = new BehaviorSubject<string>('');
  sportSelectedAction$ = this.selectedSportSubject.asObservable();

  public isEdited = new BehaviorSubject<boolean>(false);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    }),
  };

  //dohvati sve sportove
  allSports$ = this.http.get<ISport[]>(getAllSportsUrl).pipe(
    tap((sports) => console.log('Sports: ', JSON.stringify(sports))),
    catchError(this.errorHandler),
    shareReplay(1)
  );

  //izdvoji odabrani sport
  selectedSport$ = combineLatest([
    this.allSports$,
    this.sportSelectedAction$,
  ]).pipe(
    map(([sports, selectedSportsId]) =>
      sports.find((sport) => sport.id === selectedSportsId)
    ),
    tap((sport) => console.log('Sport: ', JSON.stringify(sport)))
  );

  selectSportChanged(selectedProductId: string): void {
    this.selectedSportSubject.next(selectedProductId);
  }

  update(sport: any, url: string): Observable<any> {
    return this.http.put<any>(`${url}`, sport, this.httpOptions);
  }

  private errorHandler(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
