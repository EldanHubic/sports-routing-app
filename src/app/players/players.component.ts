import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { IPlayer } from '../interfaces/player';
import { SportService } from '../_services/sport.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {
  private playerArray: IPlayer[] = [];
  constructor(
    private http: HttpClient,
    private router: ActivatedRoute,
    private _location: Location,
    private sportService: SportService,
    private modalService: NgbModal
  ) {}
  id: string = this.router.snapshot.paramMap.get('id')!;
  private playersUrl = `http://devmeta.multifeedcenter.com/Player/competitor/${this.id}`;
  private editPlayerUrl = `http://devmeta.multifeedcenter.com/Player/update`;
  inputPlayerName: string = '';
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
  players$ = this.http.get<IPlayer[]>(this.playersUrl).pipe(
    tap((data) => this.playerArray = data),
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

  

  updatePlayer(player: IPlayer) {
    let newPlayer = {
      id: player.id,
      name: this.inputPlayerName,
      sportID: player.sportID,
      countryID: player.countryID,
      sourcePlayers: player.sourcePlayers,
      createdAt: player.createdAt,
      createdBy: player.createdBy,
      deleted: player.deleted,
    };
    this.sportService
      .update(newPlayer, this.editPlayerUrl)
      .subscribe((response) => {
        const index = this.playerArray.findIndex(
          (el) => el.id === response.id
        );
        if (index > -1) {
          this.playerArray[index] = response;
          this.players$ = of(this.playerArray);
        }
      });
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
