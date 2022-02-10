import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { SportsComponent } from './sports/sports.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SportDetailComponent } from './sport-detail/sport-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './category/category.component';
import { CompetitionComponent } from './competition/competition.component';
import { CompetitorComponent } from './competitor/competitor.component';
import { PlayersComponent } from './players/players.component';
import { FooterComponent } from './footer/footer.component';


// const materialModules = [
//   MatButtonModule,
//   MatIconModule,
//   MatFormFieldModule,
//   MatInputModule,
//   MatDialogModule,
// ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SportsComponent,
    OrderByPipe,
    SportDetailComponent,
    CategoryComponent,
    CompetitionComponent,
    CompetitorComponent,
    PlayersComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    NgbModule
    // materialModules,
  ],
  // exports: [materialModules],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
