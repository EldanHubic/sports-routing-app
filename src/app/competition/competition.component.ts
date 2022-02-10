import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { ICompetition } from '../interfaces/competition';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SportService } from '../_services/sport.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css'],
})
export class CompetitionComponent implements OnInit {
  private competitionArray: ICompetition[] = [];
  constructor(
    private http: HttpClient,
    private router: ActivatedRoute,
    private _location: Location,
    private sportService: SportService,
    private modalService: NgbModal
  ) {}
  id: string = this.router.snapshot.paramMap.get('id')!;
  private competitionUrl = `http://devmeta.multifeedcenter.com/Competition/category/${this.id}?includeSources=false`;
  private editCompetitionUrl = `http://devmeta.multifeedcenter.com/Competition/update`;
  inputCompetitionName: string = '';
  sortColumn = 'id';
  reverse!: boolean;
  closeResult: string = '';
  private _search: string = '';
  get search() {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
    // console.log(value);
  }
  competitions$ = this.http.get<ICompetition[]>(this.competitionUrl).pipe(
    tap((data) => (this.competitionArray = data)),
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

  updateCompetition(competition: ICompetition) {
    let newCompetition = {
      id: competition.id,
      name: this.inputCompetitionName,
      sportID: competition.sportID,
      categoryID: competition.categoryID,
      sourceCompetitions: competition.sourceCompetitions,
      translations: competition.translations,
      createdAt: competition.createdAt,
      createdBy: competition.createdBy,
      lastCheckedBy: competition.lastCheckedBy,
      lastCheck: competition.lastCheck,
      deleted: competition.deleted,
    };
    this.sportService
      .update(newCompetition, this.editCompetitionUrl)
      .subscribe((response) => {
        const index = this.competitionArray.findIndex(
          (el) => el.id === response.id
        );
        if (index > -1) {
          this.competitionArray[index] = response;
          this.competitions$ = of(this.competitionArray);
        }
      });
      this.inputCompetitionName = '';
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
