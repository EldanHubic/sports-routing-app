import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Observable, of, tap, throwError } from 'rxjs';
import { ICategory } from '../interfaces/category';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SportService } from '../_services/sport.service';
import { ISport } from '../interfaces/sport';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  private categoryArray: ICategory[] = [];
 sportArray: ISport[] = [];
  constructor(
    private http: HttpClient,
    private router: ActivatedRoute,
    private _location: Location,
    private modalService: NgbModal,
    private sportService: SportService
  ) {}
  id: string = this.router.snapshot.paramMap.get('id')!;
  private categoryUrl = `http://devmeta.multifeedcenter.com/Category/sport/${this.id}?includeSources=false`;
  private editCategoryUrl = `http://devmeta.multifeedcenter.com/Category/update`;
  sortColumn = 'id';
  reverse!: boolean;
  inputCategoryName: string = '';
  closeResult: string = '';
  nameInTitle: string = '';
  private _search = '';
  get search() {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
    // console.log(value);
  }
  categories$ = this.http.get<ICategory[]>(this.categoryUrl).pipe(
    tap((data) => (this.categoryArray = data)),
    catchError(this.handleError)
  );

  getAllSports$ = this.sportService.allSports$.pipe(
    tap((sports) => {
      this.sportArray = sports;
    }),
    catchError((err) => {
      console.log(err);
      return EMPTY;
    })
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

  updateCategory(category: ICategory) {
    let newCategory = {
      id: category.id,
      name: this.inputCategoryName,
      sportID: category.sportID,
      country: category.country,
      countryID: category.countryID,
      sourceCategories: category.sourceCategories,
      translations: category.translations,
      createdAt: category.createdAt,
      createdBy: category.createdBy,
      deleted: category.deleted,
    };
    this.sportService
      .update(newCategory, this.editCategoryUrl)
      .subscribe((response) => {
        const index = this.categoryArray.findIndex(
          (el) => el.id === response.id
        );
        this.categoryArray[index] = response;
        this.categories$ = of(this.categoryArray);
      });
    this.inputCategoryName = '';
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
