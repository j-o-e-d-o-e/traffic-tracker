import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AirlineComponent} from './airline/airline.component';
import {HomeComponent} from './home/home.component';
import {FlightsRestComponent} from './flights-rest/flights-rest.component';
import {DayComponent} from './day/day.component';
import {WeekComponent} from './week/week.component';
import {MonthComponent} from './month/month.component';
import {ForecastComponent} from './forecast/forecast.component';
import {StatsComponent} from './stats/stats.component';
import {ErrorComponent} from './error/error.component';
import {YearComponent} from './year/year.component';
import {AirportComponent} from './airport/airport.component';
import {PlaneGraphqlComponent} from './plane-graphql/plane-graphql.component';
import {FlightsGraphqlComponent} from './flights-graphql/flights-graphql.component';
import {PlaneRestComponent} from './plane-rest/plane-rest.component';
import {FlightsPhotoComponent} from './flights-photo/flights-photo.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'plane/:icao', component: PlaneGraphqlComponent},
  {path: 'plane-rest/:icao', component: PlaneRestComponent},
  {path: 'airline/:icao', component: AirlineComponent},
  {path: 'airport/:icao', component: AirportComponent},
  {path: 'flights-graphql/:date', component: FlightsGraphqlComponent},
  {path: 'flights/:date', component: FlightsRestComponent},
  {path: 'flights/:id/photo', component: FlightsPhotoComponent},
  {path: 'day', component: DayComponent},
  {path: 'day/:date', component: DayComponent},
  {path: 'week/:date', component: WeekComponent},
  {path: 'month/:year/:month', component: MonthComponent},
  {path: 'year/:year', component: YearComponent},
  {path: 'forecast', component: ForecastComponent},
  {path: 'stats', component: StatsComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: 'day', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
