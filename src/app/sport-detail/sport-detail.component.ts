import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { SportService } from '../_services/sport.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sport-detail',
  templateUrl: './sport-detail.component.html',
  styleUrls: ['./sport-detail.component.css'],
})
export class SportDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private sportService: SportService,
    private _location: Location
  ) {}
  id: string = this.route.snapshot.paramMap.get('id')!;
  url: string = `http://devmeta.multifeedcenter.com/Sport/${this.id}`;

  selectedSport$ = this.sportService.selectedSport$.pipe(
    catchError((err) => {
      console.log(err);
      return EMPTY;
    })
  );

  goBack(): void {
    this._location.back();
  }
  ngOnInit(): void {
    this.sportService.selectSportChanged(this.id!);
  }
}
