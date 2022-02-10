import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { ICompetitor } from '../interfaces/competitor';
import { SportService } from '../_services/sport.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.css'],
})
export class CompetitorComponent implements OnInit {
  private competitorArray: ICompetitor[] = [];
  constructor(
    private http: HttpClient,
    private router: ActivatedRoute,
    private _location: Location,
    private sportService: SportService,
    private modalService: NgbModal
  ) {}
  id: string = this.router.snapshot.paramMap.get('id')!;
  private competitorsUrl = `http://devmeta.multifeedcenter.com/Competitor/competition/${this.id}`;
  private editCompetitorUrl = `http://devmeta.multifeedcenter.com/Competitor/update`;
  inputCompetitorName: string = '';
  closeResult: string = '';
  inputId: string = '';
  private _search: string = '';
  sortColumn = 'id';
  reverse!: boolean;

  get search() {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
    // console.log(value);
  }
  competitors$ = this.http.get<ICompetitor[]>(this.competitorsUrl).pipe(
    tap((data) => (this.competitorArray = data)),
    catchError(this.handleError)
  );

  goBack(): void {
    this._location.back();
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateCompetitor(competitor: ICompetitor) {
    let newCompetitor = {
      id: competitor.id,
      name: this.inputCompetitorName,
      sportID: competitor.sportID,
      countryID: competitor.countryID,
      country: competitor.country,
      sourceCompetitors: competitor.sourceCompetitors,
      translations: competitor.translations,
      createdAt: competitor.createdAt,
      createdBy: competitor.createdBy,
      lastCheckedBy: competitor.lastCheckedBy,
      lastCheck: competitor.lastCheck,
      deleted: competitor.deleted,
    };

    this.sportService
      .update(newCompetitor, this.editCompetitorUrl)
      .subscribe((response) => {
        const index = this.competitorArray.findIndex(
          (el) => el.id === response.id
        );
        if (index > -1) {
          this.competitorArray[index] = response;
          this.competitors$ = of(this.competitorArray);
        }
      });
    this.inputCompetitorName = '';
  }

  private handleError(err: any): Observable<never> {
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
  ngOnInit(): void {}
}
