import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CompetitionComponent } from './competition/competition.component';
import { CompetitorComponent } from './competitor/competitor.component';
import { AuthGuard } from './guards/auth.guard';
import { InvalidIdGuard } from './guards/invalid-id.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PlayersComponent } from './players/players.component';
import { SportDetailComponent } from './sport-detail/sport-detail.component';
import { SportsComponent } from './sports/sports.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  { path: 'sports', canActivate: [AuthGuard], component: SportsComponent },
  {
    path: 'sports/:id',
    canActivate: [AuthGuard, InvalidIdGuard],
    component: SportDetailComponent,
  },
  {
    path: 'home/sports',
    redirectTo: 'sports',
    pathMatch: 'full',
  },
  {
    path: 'category/sport/:id',
    canActivate: [AuthGuard, InvalidIdGuard],
    component: CategoryComponent,
  },
  {
    path: 'competition/category/:id',
    canActivate: [AuthGuard, InvalidIdGuard],
    component: CompetitionComponent,
  },
  {
    path: 'competitor/competition/:id',
    canActivate: [AuthGuard, InvalidIdGuard],
    component: CompetitorComponent,
  },
  {
    path: 'player/competitor/:id',
    canActivate: [AuthGuard, InvalidIdGuard],
    component: PlayersComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
