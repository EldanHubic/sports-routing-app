import { Component } from '@angular/core';
import { catchError, EMPTY, of, tap } from 'rxjs';
import { SportService } from '../_services/sport.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ISport } from '../interfaces/sport';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css'],
})
export class SportsComponent {
  isSportEdited!: boolean;
  sportArray: ISport[] = [];
  constructor(
    private sportService: SportService,
    private modalService: NgbModal,
    private _location: Location
  ) {
    // this.sportService.isEdited.subscribe(
    //   (value) => (this.isSportEdited = value)
    // );
  }
  private editSportUrl: string = `http://devmeta.multifeedcenter.com/Sport/update`;
  sortColumn = 'id';
  reverse!: boolean;
  private _search: string = '';
  closeResult: string = '';
  inputSportName: string = '';
  get search() {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
    // console.log(value);
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

  goBack(): void {
    this._location.back();
  }

  getAllSports$ = this.sportService.allSports$.pipe(
    tap((sports) => (this.sportArray = sports)),
    catchError((err) => {
      console.log(err);
      return EMPTY;
    })
  );

  updateSport(sport: ISport) {
    let newSport = {
      id: sport.id,
      name: this.inputSportName,
      sourceSports: sport.sourceSports,
      translations: sport.translations,
      createdAt: sport.createdAt,
      createdBy: sport.createdAt,
      deleted: sport.deleted,
    };
    this.sportService
      .update(newSport, this.editSportUrl)
      .subscribe((response) => {
        const index = this.sportArray.findIndex((el) => el.id === response.id);
        if (index > -1) {
          this.sportArray[index] = response;
          this.getAllSports$ = of(this.sportArray);
        }
        // this.sportService.isEdited.next(true);
        console.log(sport);
        console.log(newSport);
      });
    this.inputSportName = '';
  }
}
